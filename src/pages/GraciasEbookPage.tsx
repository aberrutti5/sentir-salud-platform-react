import React, { useState } from 'react';

export default function GraciasEbookPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/download-ebook');
      if (!res.ok) throw new Error('Error al obtener el enlace');
      const { url } = await res.json();
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      setError('No se pudo generar el enlace. Intentá de nuevo o contáctanos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7d664] flex flex-col items-center justify-center px-4">
      <div className="bg-white/90 rounded-lg shadow-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">¡Gracias por tu compra!</h1>
        <p className="text-lg text-gray-800 mb-6">
          Tu pago fue procesado con éxito.<br />
          Ya puedes descargar tu ebook y comenzar tu camino de sanación.
        </p>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-green-600 text-white font-bold px-8 py-3 rounded-md text-lg shadow hover:bg-green-700 transition-colors mb-4 inline-block disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Generando enlace...' : 'Descargar ebook'}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <p className="text-gray-700 mt-4">
          ¿Tienes problemas para descargar?{' '}
          <a href="mailto:administracion@sentirsaludcapacitacion.com" className="text-green-700 underline">
            Contáctanos
          </a>{' '}
          y te ayudaremos.
        </p>
      </div>
    </div>
  );
}
