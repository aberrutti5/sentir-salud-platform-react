import React from 'react';
import { Link } from 'react-router-dom';

const testimonios = [
  {
    texto: 'No sé cómo agradecerte. Hice el ejercicio del ebook con lágrimas, y entendí el conflicto que nunca quise mirar. Ayer me dieron los resultados de la biopsia y salió negativo. Me sentí libre, como si me hubiese sacado una mochila de años. Gracias por ayudarme a sanar el alma y el cuerpo.',
  },
  {
    texto: 'Holaaa, te juro que me explota el corazón. Estoy SANA. Después de tanto tiempo, me siento mucho mejor. Seguí el ebook como si fuera una charla entre amigas y me ayudó a entender cosas de mi historia que no había relacionado nunca. Eternamente agradecida.',
  },
  /*{
    texto: 'Confirmado: pólipos desaparecieron. Entendí gracias al ebook el conflicto de asco e invasión. Lo trabajé con los ejercicios y realmente noté un cambio físico y emocional. Biodescodificarme fue clave. Gracias.',
  },*/
  {
    texto: 'Estoy llorando mientras te escribo. Hice todo lo que proponías en el ebook, sin dejar pasar un día. Me aferré a esa luz que ofrecés, y hoy los médicos me dijeron que la enfermedad está controlada. ¡Esto da esperanza! Gracias por escribir algo tan sanador.',
  },
  {
    texto: 'Te cuento que me hicieron los últimos controles de mi fibroma y estoy completamente sana. Gracias de corazón por tu ebook. Me enseñaste a mirar distinto, a sentir distinto. ¡Sanar desde adentro es posible!',
  },
];

export default function EbookLandingPage() {
  return (
    <div className="min-h-screen bg-[#f7d664] w-full">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <img src="/nuevo-ebook.jpg" alt="Portada ebook" className="w-64 rounded-lg shadow-lg mb-6 mx-auto" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">EL CÁNCER NO ES TU ENEMIGO</h1>
        <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">El camino hacia la sanación desde la Biodescodificación</p>
        <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto mb-6">Descubrí una nueva mirada que une ciencia, emociones y conciencia para sanar en profundidad.</p>
        <a href="#oferta" className="bg-green-600 text-white font-bold px-8 py-3 rounded-md text-lg shadow hover:bg-green-700 transition-colors">¡QUIERO MI EBOOK AHORA!</a>
      </section>

      {/* ¿Qué incluye el ebook? */}
      <section className="py-10 px-4 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">¿QUÉ INCLUYE EL EBOOK?</h2>
        <ul className="text-lg text-gray-800 space-y-2">
          <li>• 20 protocolos prácticos para abordar los conflictos emocionales del cáncer.</li>
          <li>• Casos reales que inspiran sanación.</li>
          <li>• Técnicas de PNL, reimpronta y conexión con el inconsciente.</li>
          <li>• Una guía paso a paso para acompañar procesos emocionales profundos.</li>
        </ul>
      </section>

      {/* Imagen extra de la portada */}
      <section className="flex justify-center py-6">
        <img src="/portadaebook.png" alt="Portada del ebook" className="w-64 md:w-80 rounded-lg shadow-lg border-4 border-yellow-300" />
      </section>

      {/* Sobre la autora */}
      <section className="py-10 px-4 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-[#fff7d1] rounded-lg shadow">
        <img src="/profileebook.jpg" alt="Ana Claudia Corbo" className="w-32 h-32 rounded-full object-cover border-4 border-yellow-300" />
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sobre la autora</h3>
          <p className="text-gray-800 mb-2">Ana Claudia Corbo es Terapeuta y Master en Biodescodificación y PNL Coach, Directora de Sentir Salud Capacitación Internacional.</p>
          <p className="text-gray-800">Ha acompañado a cientos de personas en procesos de sanación profunda y comparte su método con claridad, empatía y pasión.</p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">Testimonios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonios.map((t, i) => (
            <div key={i} className="bg-white/80 rounded-lg p-6 shadow text-gray-800 italic">{t.texto}</div>
          ))}
        </div>
      </section>

      {/* Oferta y botón de compra */}
      <section id="oferta" className="py-10 px-4 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">¡Precio lanzamiento por tiempo limitado!</h2>
        <p className="text-lg text-gray-800 mb-2">Incluye audio de hipnosis guiada para activar tu sanación interior.</p>
        <div className="bg-green-100 rounded-lg p-6 mb-4">
          <span className="block text-3xl font-bold text-green-700 mb-2">Solo 9 dólares</span>
          <span className="text-gray-700">Oferta válida por tiempo limitado</span>
        </div>
        <a href="https://www.paypal.com/ncp/payment/EK2CZL49B9VKJ" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-bold px-8 py-3 rounded-md text-lg shadow hover:bg-green-700 transition-colors">¡QUIERO MI EBOOK AHORA!</a>
      </section>

      {/* ¿Para quién es este ebook? y contenido */}
      <section className="py-10 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">¿Este ebook es para vos si...</h2>
        <ul className="list-disc pl-6 text-lg text-gray-800 mb-6 space-y-1">
          <li>Estás atravesando un diagnóstico o acompañás a alguien en esto.</li>
          <li>Sentís que hay un mensaje detrás del síntoma o querés comprenderlo.</li>
          <li>Buscás herramientas prácticas de sanación emocional.</li>
          <li>Te interesa la Biodescodificación y la PNL como caminos de transformación.</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Contenido del ebook</h3>
        <ul className="list-decimal pl-6 text-gray-800 space-y-1">
          <li>Qué son las 5 Leyes Biológicas y cómo explican el cáncer</li>
          <li>Cómo trabajar el cáncer desde la Biodescodificación, pnl, reimpronta y conexión con el inconsciente</li>
          <li>Casos reales que inspiran sanación</li>
          <li>20 Protocolos sanadores efectivos para realizar la práctica para trabajar la raíz del cáncer</li>
          <li>Claves para acompañar el proceso emocional</li>
          <li>Una guía transformadora al proceso emocional</li>
        </ul>
      </section>

      {/* CTA final */}
      <section className="py-10 px-4 text-center">
        <a href="https://www.paypal.com/ncp/payment/EK2CZL49B9VKJ" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-bold px-10 py-4 rounded-md text-xl shadow hover:bg-green-700 transition-colors">LO QUIERO AHORA</a>
        <p className="text-gray-700 mt-2">Oferta válida solo por los próximos minutos</p>
      </section>
    </div>
  );
}
