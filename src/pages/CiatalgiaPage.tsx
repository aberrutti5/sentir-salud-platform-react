import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Heart, Brain, CheckCircle } from 'lucide-react';

function CiatalgiaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link to="/" className="flex items-center text-green-600 hover:text-green-700 transition-colors no-underline">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Volver al inicio</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.png" alt="Sentir Salud" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-5 icon-float">
              <Zap className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ciatalgia y Biodescodificación
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Descubre el significado emocional detrás del dolor ciático y cómo la
            Biodescodificación puede ayudarte a sanar desde la raíz.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es la Ciatalgia?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                La ciatalgia o dolor ciático es un conjunto de síntomas producidos por la
                irritación o compresión del nervio ciático, el nervio más largo del cuerpo humano.
                Se manifiesta como un dolor que recorre desde la parte baja de la espalda hacia
                la pierna.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Desde la perspectiva de la Biodescodificación, este dolor tiene un mensaje
                emocional profundo relacionado con el avance, la dirección y el apoyo en
                nuestra vida.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Enfoque Bioemocional</h2>
              <div className="space-y-4">
                {[
                  { icon: Brain, text: 'Conflictos relacionados con el "ir hacia adelante" en la vida' },
                  { icon: Heart, text: 'Sensación de falta de apoyo o sostén emocional' },
                  { icon: Zap,   text: 'Tensión entre lo que queremos y lo que creemos que debemos hacer' },
                  { icon: CheckCircle, text: 'Miedo al futuro o dificultad para avanzar' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Querés trabajar tu ciatalgia?</h2>
          <p className="text-green-100 mb-8 text-lg">
            En Sentir Salud te acompañamos en un proceso de autoconocimiento y sanación integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sesionesbio"
              className="bg-white text-green-600 font-bold px-8 py-3 rounded-md hover:bg-green-50 transition-colors no-underline"
            >
              Reservar una sesión
            </Link>
            <Link
              to="/bioinfo"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-md hover:bg-green-700 transition-colors no-underline"
            >
              Conocer más sobre Biodescodificación
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CiatalgiaPage;
