import type { VercelRequest, VercelResponse } from '@vercel/node';

const EBOOK_BLOB_URL =
  'https://n7um2wv11s6fj4ji.private.blob.vercel-storage.com/El%20c%C3%A1ncer%20no%20es%20tu%20enemigo%20-%20Claudia%20Corbo%20-%20Sentir%20Salud.pdf';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Token no configurado' });
  }

  try {
    const blobRes = await fetch(EBOOK_BLOB_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!blobRes.ok) {
      return res.status(blobRes.status).json({ error: 'No se pudo acceder al archivo' });
    }

    const buffer = await blobRes.arrayBuffer();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="El-cancer-no-es-tu-enemigo-Sentir-Salud.pdf"'
    );
    res.setHeader('Content-Length', buffer.byteLength);

    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error descargando el ebook:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
