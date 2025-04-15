import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../main";

function AdminPage() {
  const [payments, setPayments] = useState<any[]>([]); // Estado para almacenar los datos de pagos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentsRef = collection(db, "collectionPayments"); // Referencia a la colección de pagos
        const paymentsSnapshot = await getDocs(paymentsRef);

        const paymentsData = await Promise.all(
          paymentsSnapshot.docs.map(async (paymentDoc) => {
            const paymentData = paymentDoc.data();
            const userRef = paymentData.id; // Campo `id` es una referencia

            // Obtén los datos del usuario desde la referencia
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              return {
                id: paymentDoc.id, // UID del alumno
                name: userData.name || "Sin nombre", // Nombre del usuario
                payments: paymentData.payments || [], // Array de pagos
              };
            } else {
              console.error(`No se encontró el usuario para la referencia: ${userRef.path}`);
              return {
                id: paymentDoc.id,
                name: "Usuario no encontrado",
                payments: paymentData.payments || [],
              };
            }
          })
        );

        setPayments(paymentsData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Cargando datos...</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Administración de Alumnos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Próximo Pago</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Cuotas Restantes</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              // Calcula el próximo pago y las cuotas restantes
              const nextPayment = payment.payments.find((p: any) => p.status === "pending");
              const remainingPayments = payment.payments.filter((p: any) => p.status === "pending").length;

              return (
                <tr key={payment.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-800">{payment.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {nextPayment ? nextPayment.date : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{remainingPayments}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {remainingPayments > 0 ? "Pendiente" : "Al día"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;