import React from 'react';

export default function GraciasEbookPage() {
  return (
    <div className="min-h-screen bg-[#f7d664] flex flex-col items-center justify-center px-4">
      <div className="bg-white/90 rounded-lg shadow-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">¡Gracias por tu compra!</h1>
        <p className="text-lg text-gray-800 mb-6">Tu pago fue procesado con éxito.<br />Ya puedes descargar tu ebook y comenzar tu camino de sanación.</p>
        <a
          href="https://ahmgkmoijwodldkivywd.supabase.co/storage/v1/object/sign/sentirsaludplatform1/El-cancer-no-es-tu-enemigo-Claudia%20Corbo-Sentir%20Salud.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jY2MyMGQxOC1iOWI1LTQ4ZWItYjMyNi0yN2NiYTM4ZmU0OTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZW50aXJzYWx1ZHBsYXRmb3JtMS9FbC1jYW5jZXItbm8tZXMtdHUtZW5lbWlnby1DbGF1ZGlhIENvcmJvLVNlbnRpciBTYWx1ZC5wZGYiLCJpYXQiOjE3NTM5OTU0OTgsImV4cCI6MTg0ODYwMzQ5OH0.KuvDoGWOfafU-BMUaoilmzv0jsNoT-93vJcCS8nn5mU"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white font-bold px-8 py-3 rounded-md text-lg shadow hover:bg-green-700 transition-colors mb-4 inline-block"
        >
          Descargar ebook
        </a>
        <p className="text-gray-700 mt-4">¿Tienes problemas para descargar? <a href="mailto:administracion@sentirsaludcapacitacion.com" className="text-green-700 underline">Contáctanos</a> y te ayudaremos.</p>
      </div>
    </div>
  );
} 