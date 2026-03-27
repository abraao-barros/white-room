/**
 * Helper client-side para enviar arquivos massivos para a Cloudflare R2.
 * Bypass do servidor node backend, usando as URLs Presigned.
 */
export async function uploadToR2(file: File): Promise<string> {
    // 1. Requisitar a Signature pro Servidor e checar Rate Limit/Sessão.
    const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao solicitar autorização para Upload');
    }

    const { uploadUrl, publicUrl } = await response.json();

    // 2. Fazer PUT com a carga massiva apontando direto pro Datacenter da Cloudflare.
    try {
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (!uploadResponse.ok) {
            throw new Error(`Cloudflare R2 respondeu com erro ${uploadResponse.status}`);
        }
    } catch (err: any) {
        if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
            throw new Error('Erro de conexão ou CORS: Verifique se o bucket R2 permite requisições da sua origem (localhost).');
        }
        throw err;
    }

    // 3. Retornar a URL final pré formatada caso necessite salvar em bancos de dados.
    return publicUrl;
}
