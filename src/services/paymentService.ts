import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

interface PaymentData {
  orderId: string;
  packageId: number;
  packageName: string;
  amount: string;
  status: string;
  userId?: string;
  email?: string;
}

export const savePayment = async (paymentData: PaymentData) => {
  try {
    console.log("Iniciando guardado en Firebase...");
    console.log("Base de datos:", db);
    console.log("Colección: collectionPayments");
    
    const paymentRef = await addDoc(collection(db, 'collectionPayments'), {
      ...paymentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('Pago guardado con ID:', paymentRef.id);
    return paymentRef.id;
  } catch (error) {
    console.error('Error detallado al guardar el pago:', error);
    throw error;
  }
}; 