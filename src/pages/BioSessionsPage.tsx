import React from "react";
import BlurText from "../components/BlurText/BlurText";

function BioSessionsPage() {
const packages = [
    {
      id: 1,
      name: "Sesión de Prueba",
      sessions: 1,
      description: "Experimenta una sesión completa de Biodescodificación",
      benefits: [
        "Evaluación inicial personalizada",
        "Identificación de conflictos principales",
        "Plan de acción inicial"
      ],
      price: "80"
    },
    {
      id: 2,
      name: "Paquete Básico",
      sessions: 3,
      description: "Ideal para abordar un tema específico",
      benefits: [
        "3 sesiones completas",
        "Seguimiento entre sesiones",
        "Material de apoyo personalizado",
        "15% de descuento sobre el precio individual"
      ],
      price: "200"
    },
    {
      id: 3,
      name: "Paquete Transformación",
      sessions: 10,
      description: "Proceso completo de transformación",
      benefits: [
        "10 sesiones completas",
        "Seguimiento continuo",
        "Material de apoyo extenso",
        "Ejercicios personalizados",
        "30% de descuento sobre el precio individual"
      ],
      price: "600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section con imagen */}
      <section className="relative bg-green-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="fixed inset-0 -z-10">
            <img
              src="/src/assets/meditation-bg.jpg"
              alt="Meditación y bienestar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="mb-8">
            <img
              src="/src/assets/meditation-illustration.png"
              alt="Ilustración de meditación"
              className="w-40 h-40 object-contain mb-6"
            />
          </div>
          <BlurText
            text="Sesiones de Biodescodificación"
            className="text-4xl font-bold mb-4"
            animateBy="letters"
            direction="top"
          />
          <p className="text-lg mb-8 max-w-2xl">
            Descubre el poder de la sanación emocional a través de nuestras sesiones personalizadas
          </p>
          <button className="bg-white text-green-600 font-bold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
            Comienza Ahora
          </button>
        </div>
      </section>

      {/* Información sobre las sesiones */}
      <section className="relative z-10 py-16">
        <div className="absolute inset-0 bg-white opacity-95"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">¿Cómo son las sesiones?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600">Duración y Formato</h3>
              <p className="text-gray-700">
                Cada sesión tiene una duración aproximada de 60-90 minutos. Las sesiones se realizan de forma individual
                y personalizada, ya sea presencial o en línea según tu preferencia.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600">Metodología</h3>
              <p className="text-gray-700">
                Utilizamos técnicas avanzadas de Biodescodificación para identificar y resolver conflictos emocionales,
                trabajando en un ambiente seguro y confidencial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paquetes disponibles */}
      <section className="relative z-10 py-16">
        <div className="absolute inset-0 bg-green-50 opacity-95"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Paquetes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-600 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => {/* Implementar función de pago más adelante */}}
                  >
                    Seleccionar Paquete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16">
        <div className="absolute inset-0 bg-white opacity-95"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Preguntas Frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600">¿Cómo me preparo para una sesión?</h3>
              <p className="text-gray-700">
                Solo necesitas venir con una mente abierta y la disposición para explorar tus emociones. 
                Te recomendamos estar en un lugar tranquilo y cómodo durante la sesión.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600">¿Cuánto tiempo debo esperar entre sesiones?</h3>
              <p className="text-gray-700">
                Generalmente recomendamos un espacio de 1-2 semanas entre sesiones para permitir la integración 
                del trabajo realizado. Sin embargo, esto puede ajustarse según tus necesidades específicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción final */}
      <section className="relative z-10 py-16">
        <div className="absolute inset-0 bg-green-600 opacity-95"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Comienza Tu Viaje de Sanación Hoy</h2>
          <p className="text-lg mb-8 text-white">
            Elige el paquete que mejor se adapte a tus necesidades y da el primer paso hacia tu transformación
          </p>
          <button
            className="bg-white text-green-600 font-bold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => {/* Implementar función de contacto */}}
          >
            Agenda tu Primera Sesión
          </button>
        </div>
      </section>
    </div>
  );
}

export default BioSessionsPage;
