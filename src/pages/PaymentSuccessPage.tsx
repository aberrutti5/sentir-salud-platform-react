import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

interface PaymentData {
  order_id: string;
  description: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: any;
  dlocalPaymentId: string;
}

function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'pending' | 'error'>('pending');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('order_id');
        
        if (!orderId) {
          console.error('No se encontró order_id en la URL');
          setPaymentStatus('error');
          return;
        }

        console.log('Verificando estado del pago para order_id:', orderId);

        const paymentsRef = collection(db, 'collectionPayments');
        const q = query(paymentsRef, where('order_id', '==', orderId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.error('No se encontró el pago en la base de datos');
          setPaymentStatus('error');
          return;
        }

        const paymentDoc = querySnapshot.docs[0];
        const data = paymentDoc.data() as PaymentData;
        setPaymentData(data);

        console.log('Datos del pago encontrados:', data);

        if (data.status === 'COMPLETED' || data.status === 'PAID') {
          setPaymentStatus('success');
        } else if (data.status === 'PENDING') {
          setPaymentStatus('pending');
        } else {
          setPaymentStatus('error');
        }
      } catch (error) {
        console.error('Error al verificar el estado del pago:', error);
        setPaymentStatus('error');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [location]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+59893768645?text=Hola,%20tengo%20una%20consulta%20sobre%20mi%20pago', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando el estado de tu pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {paymentStatus === 'success' ? (
            <>
              <div className="mb-8">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pago Exitoso!</h1>
              <p className="text-lg text-gray-600 mb-8">
                Gracias por tu compra. Nos pondremos en contacto contigo pronto para agendar tu sesión.
              </p>
              
              {paymentData && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles del Pago</h2>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      <span className="font-medium">Paquete:</span> {paymentData.description}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Monto:</span> {paymentData.currency} {paymentData.amount}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">ID de Orden:</span> {paymentData.order_id}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Estado:</span> Completado
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] text-white px-6 py-3 rounded-md hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contactar por WhatsApp
                </button>
              </div>
            </>
          ) : paymentStatus === 'pending' ? (
            <>
              <div className="mb-8">
                <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Pago en Proceso</h1>
              <p className="text-lg text-gray-600 mb-8">
                Tu pago está siendo procesado. Te notificaremos cuando se complete.
              </p>
              
              {paymentData && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles del Pago</h2>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      <span className="font-medium">Paquete:</span> {paymentData.description}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Monto:</span> {paymentData.currency} {paymentData.amount}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">ID de Orden:</span> {paymentData.order_id}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Estado:</span> En proceso
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] text-white px-6 py-3 rounded-md hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contactar por WhatsApp
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Error en el Pago</h1>
              <p className="text-lg text-gray-600 mb-8">
                Hubo un problema con tu pago. Por favor, intenta nuevamente o contáctanos por WhatsApp.
              </p>
              
              {paymentData && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles del Pago</h2>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      <span className="font-medium">Paquete:</span> {paymentData.description}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Monto:</span> {paymentData.currency} {paymentData.amount}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">ID de Orden:</span> {paymentData.order_id}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Estado:</span> Error
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/sesionesbio')}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  Intentar Nuevamente
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] text-white px-6 py-3 rounded-md hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contactar por WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage; 