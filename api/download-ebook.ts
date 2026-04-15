import { createSignedDownloadUrl } from '@vercel/blob';

const EBOOK_BLOB_URL =
  'https://n7um2wv11s6fj4ji.private.blob.vercel-storage.com/El%20c%C3%A1ncer%20no%20es%20tu%20enemigo%20-%20Claudia%20Corbo%20-%20Sentir%20Salud.pdf';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const signedUrl = await createSignedDownloadUrl(EBOOK_BLOB_URL, {
      expiresIn: 3600, // expira en 1 hora
    });

    return new Response(JSON.stringify({ url: signedUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return new Response(JSON.stringify({ error: 'No se pudo generar el enlace de descarga' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
