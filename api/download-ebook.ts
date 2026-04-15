import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createSignedDownloadUrl } from '@vercel/blob';

const EBOOK_BLOB_URL =
  'https://n7um2wv11s6fj4ji.private.blob.vercel-storage.com/El%20c%C3%A1ncer%20no%20es%20tu%20enemigo%20-%20Claudia%20Corbo%20-%20Sentir%20Salud.pdf';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const signedUrl = await createSignedDownloadUrl(EBOOK_BLOB_URL, {
      expiresIn: 3600,
    });
    return res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return res.status(500).json({ error: 'No se pudo generar el enlace de descarga' });
  }
}
