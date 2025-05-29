import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface DLocalPaymentData {
  currency: string;
  amount: number;
  country: string;
  order_id: string;
  description: string;
  success_url: string;
  back_url: string;
  notification_url: string;
  payer?: {
    name?: string;
    email?: string;
    phone?: string;
    document_type?: string;
    document?: string;
  };
}

// Función para verificar las credenciales de DLocal
export const verifyDLocalCredentials = async () => {
  try {
    const apiKey = import.meta.env.VITE_DLOCAL_API_KEY;
    const secretKey = import.meta.env.VITE_DLOCAL_SECRET_KEY;
    
    if (!apiKey || !secretKey) {
      console.error('Credenciales faltantes:', {
        apiKeyPresent: !!apiKey,
        secretKeyPresent: !!secretKey
      });
      throw new Error('Las credenciales de DLocal no están configuradas correctamente');
    }
    
    console.log('Verificando credenciales DLocal...');
    
    const response = await fetch('/api/dlocal/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}:${secretKey}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al verificar credenciales DLocal:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Error al verificar credenciales: ${errorData.message || 'Error desconocido'}`);
    }
    
    const data = await response.json();
    console.log('Credenciales DLocal verificadas correctamente:', data);
    return true;
  } catch (error) {
    console.error('Error al verificar credenciales DLocal:', error);
    return false;
  }
};

export const createDLocalPayment = async (paymentData: DLocalPaymentData) => {
  try {
    console.log('Iniciando creación de pago con datos:', {
      ...paymentData,
      amount: paymentData.amount,
      currency: paymentData.currency
    });

    // Verificar credenciales antes de crear el pago
    const credentialsValid = await verifyDLocalCredentials();
    if (!credentialsValid) {
      throw new Error('Las credenciales de DLocal no son válidas');
    }
    
    const apiKey = import.meta.env.VITE_DLOCAL_API_KEY;
    const secretKey = import.meta.env.VITE_DLOCAL_SECRET_KEY;
    
    console.log('Credenciales DLocal:', { 
      apiKeyPresent: !!apiKey,
      secretKeyPresent: !!secretKey
    });
    
    const response = await fetch('/api/dlocal/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}:${secretKey}`
      },
      body: JSON.stringify(paymentData)
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Error response from DLocal:', {
        status: response.status,
        statusText: response.statusText,
        errorData: responseData
      });
      throw new Error(`Error al crear el pago en DLocal: ${responseData.message || 'Error desconocido'}`);
    }

    console.log('Pago creado en DLocal:', responseData);

    // Guardar en Firebase
    try {
      const paymentRef = await addDoc(collection(db, 'collectionPayments'), {
        ...paymentData,
        dlocalPaymentId: responseData.id,
        status: responseData.status,
        redirectUrl: responseData.redirect_url,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log('Pago guardado en Firebase con ID:', paymentRef.id);

      return {
        ...responseData,
        firebaseId: paymentRef.id
      };
    } catch (firebaseError) {
      console.error('Error al guardar en Firebase:', firebaseError);
      // Aún retornamos los datos de DLocal aunque falle Firebase
      return responseData;
    }
  } catch (error) {
    console.error('Error detallado en createDLocalPayment:', {
      error,
      message: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}; 