import React, { useState } from "react";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import BlurText from "../components/BlurText/BlurText";

function BioSessionsPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

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

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+59893768645?text=Hola,%20me%20interesa%20saber%20más%20sobre%20las%20sesiones%20de%20Biodescodificación', '_blank');
  };

  const createOrder = (data: any, actions: any, amount: string, packageName: string) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `Paquete: ${packageName}`,
          custom_id: `package_${packageName.toLowerCase().replace(/\s+/g, '_')}`,
          amount: {
            currency_code: "USD",
            value: amount
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: window.location.href,
        cancel_url: window.location.href,
      }
    });
  };

  const onApprove = async (data: any, actions: any, packageId: number) => {
    setLoading(true);
    setSelectedPackage(packageId);
    try {
      const order = await actions.order.capture();
      console.log("Pago exitoso:", order);
      alert("¡Pago realizado con éxito! Nos pondremos en contacto contigo pronto para agendar tu sesión.");
    } catch (error: any) {
      console.error("Error al procesar el pago:", error);
      if (error.message?.includes("Window closed")) {
        alert("La ventana de pago se cerró. Por favor, intenta nuevamente.");
      } else {
        alert("Hubo un error al procesar el pago. Por favor, intenta nuevamente o contáctanos por WhatsApp.");
      }
    } finally {
      setLoading(false);
      setSelectedPackage(null);
    }
  };

  const onError = (err: any) => {
    console.error("Error en PayPal:", err);
    alert("Hubo un error con PayPal. Por favor, intenta nuevamente o contáctanos por WhatsApp.");
  };

  const onCancel = () => {
    alert("Pago cancelado. Puedes intentar nuevamente cuando lo desees.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center gap-2 group"
      >
        <svg 
          className="w-8 h-8"
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-16 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
          Chatea con nosotros
        </span>
      </button>

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
                  <div className="space-y-4">
                    {loading && selectedPackage === pkg.id ? (
                      <div className="text-center py-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                        <span className="text-gray-600 mt-2 block">Procesando pago...</span>
                      </div>
                    ) : (
                      <PayPalButtons
                        fundingSource={FUNDING.PAYPAL}
                        style={{ 
                          layout: "vertical",
                          shape: "rect",
                          color: "gold",
                          height: 55
                        }}
                        createOrder={(data, actions) => createOrder(data, actions, pkg.price, pkg.name)}
                        onApprove={(data, actions) => onApprove(data, actions, pkg.id)}
                        onError={onError}
                        onCancel={onCancel}
                        forceReRender={[pkg.price]}
                      />
                    )}
                  </div>
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
