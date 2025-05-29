import React from "react";
import BlurText from "../components/BlurText/BlurText"; // Adjusted the path based on the project structure

function BioInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <BlurText
            text="¿Qué es la Biodescodificación?"
            className="text-4xl font-bold mb-4"
            animateBy="letters"
            direction="top"
          />
          <p className="text-lg">
            Descubre cómo la Biodescodificación puede ayudarte a transformar tu vida al identificar y liberar conflictos emocionales.
          </p>
        </div>
      </section>

      {/* Información principal */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Una Nueva Perspectiva de Sanación</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            La Biodescodificación es una metodología que busca el origen emocional de las enfermedades. A través de un enfoque holístico, 
            se trabaja para identificar conflictos emocionales no resueltos que pueden estar afectando tu bienestar físico y mental.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Este enfoque combina conocimientos de biología, psicología y neurociencia para ayudarte a comprender cómo tus emociones y 
            experiencias de vida influyen en tu salud. Es una herramienta poderosa para quienes buscan sanar desde la raíz.
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Beneficios de la Biodescodificación</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-green-50 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Sanación Emocional</h3>
              <p className="text-gray-700">
                Libera emociones atrapadas y encuentra paz interior al resolver conflictos emocionales.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Mejora Física</h3>
              <p className="text-gray-700">
                Experimenta mejoras en tu salud física al abordar las causas emocionales de las enfermedades.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Autoconocimiento</h3>
              <p className="text-gray-700">
                Aprende más sobre ti mismo y cómo tus experiencias de vida han moldeado tu bienestar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Transformar Tu Vida?</h2>
          <p className="text-lg mb-8">
            Descubre cómo la Biodescodificación puede ayudarte a alcanzar un bienestar integral.
          </p>
          <a
            href="/#contacto"
            className="bg-white text-green-600 font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}

export default BioInfoPage;