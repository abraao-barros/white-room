import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/s3";
import { getSession } from "@/lib/auth";
import { rateLimiter } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // 1. Authenticate Session
    const session = await getSession();
    if (!session || !session.userId) {
      console.warn("API Upload - Unauthorized: No session or userId found in production.");
      return NextResponse.json({ error: "Não autorizado. Confirme o login." }, { status: 401 });
    }

    const userId = session.userId;

    // 2. Rate Limiting (10 requests per minute per user)
    const { success } = rateLimiter.limit(`upload_limit_${userId}`, 10, 60 * 1000);
    if (!success) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde um instante para fazer mais uploads." }, { status: 429 });
    }

    // 3. Parse Request
    const { filename, contentType } = await request.json();
    if (!filename || !contentType) {
      return NextResponse.json({ error: "Faltando dados identificadores do arquivo." }, { status: 400 });
    }

    // 4. Sanitize and Structure Key
    const ext = filename.split('.').pop();
    const uniqueId = crypto.randomUUID();
    const objectKey = `uploads/user_${userId}/${uniqueId}.${ext}`;

    const bucketName = process.env.BUCKET_NAME?.trim();
    const publicDomain = process.env.PUBLIC_DOMAIN?.trim();
    if (!bucketName || !publicDomain) {
      throw new Error("Missing R2/Bucket configuration variables in server.");
    }

    // 5. Generate Presigned URL
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 }); // Expira em 5 min
    
    // Se o PUBLIC_DOMAIN já termina com o nome do bucket, não adicionamos de novo.
    // Mas o objectKey já é 'uploads/user_...'. Então concatenamos direto.
    const baseUrl = publicDomain.endsWith('/') ? publicDomain.slice(0, -1) : publicDomain;
    const publicUrl = `${baseUrl}/${objectKey}`;

    return NextResponse.json({
      uploadUrl,
      publicUrl,
      objectKey
    });
  } catch (error: any) {
    console.error("Presigned URL Generation Error (PROD):", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json({ 
      error: "Falha na geração da autorização de Upload."
    }, { status: 500 });
  }
}
