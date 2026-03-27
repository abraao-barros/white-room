import { S3Client } from '@aws-sdk/client-s3';

const accessKeyId = process.env.ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.SECRET_KEY?.trim();
const apiR2 = process.env.API_R2?.trim();

if (!apiR2 || !accessKeyId || !secretAccessKey) {
  // Gracefully avoiding app crash on build but logging out error if accessed
  console.error("Missing Cloudflare R2 credentials (API_R2, etc) in environment variables");
}

// Ensure the endpoint is JUST the bucket-less S3 API URL (https://<id>.r2.cloudflarestorage.com)
// Even if the user pasted the bucket name in the .env, we strip it here.
let cleanEndpoint = apiR2;
if (apiR2) {
    try {
        const url = new URL(apiR2);
        cleanEndpoint = url.origin; // This gets 'https://<id>.r2.cloudflarestorage.com'
    } catch (e) {
        // Fallback if URL parsing fails
        cleanEndpoint = apiR2.split('/')[0] + '//' + apiR2.split('/')[2];
    }
}

export const r2 = new S3Client({
  region: "auto",
  endpoint: cleanEndpoint,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
});
