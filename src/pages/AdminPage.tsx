import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, getDoc, doc, updateDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../main";

function AdminPage() {
  const [payments, setPayments] = useState<any[]>([]); // Estado para almacenar los datos de pagos
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [formData, setFormData] = useState({
    uid: "",
    amount: 0,
    date: "",
    status: "pending",
  }); // Estado para el formulario
  const [activeUsers, setActiveUsers] = useState<any[]>([]); // Estado para almacenar los alumnos activos

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentsRef = collection(db, "collectionPayments");
        const paymentsSnapshot = await getDocs(paymentsRef);

        const paymentsData = await Promise.all(
          paymentsSnapshot.docs.map(async (paymentDoc) => {
            const paymentData = paymentDoc.data();
            const userRef = doc(db, "users", paymentDoc.id); // Usa el ID del documento como referencia

            let userName = "Usuario no encontrado";
            try {
              const userSnapshot = await getDoc(userRef);
              if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                userName = userData.name || "Sin nombre";
              }
            } catch (error) {
              console.error(`Error al obtener el usuario para el UID: ${paymentDoc.id}`, error);
            }

            return {
              id: paymentDoc.id,
              name: userName,
              nextPayment: paymentData.nextPayment || "N/A",
              remainingPayments: paymentData.remainingPayments || 0,
              payments: paymentData.payments || [],
            };
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

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const usersRef = collection(db, "users"); // Referencia a la colección de usuarios
        const usersSnapshot = await getDocs(usersRef);

        const activeUsersData = usersSnapshot.docs
          .filter((doc) => doc.data().active) // Filtra solo los usuarios activos
          .map((doc) => ({
            uid: doc.id, // Usa el ID del documento como UID
            name: doc.data().name || "Sin nombre", // Nombre del usuario
          }));

        setActiveUsers(activeUsersData);
      } catch (error) {
        console.error("Error al obtener los usuarios activos:", error);
      }
    };

    fetchActiveUsers();
  }, []);

  const handleAddPayment = async () => {
    try {
      const { uid, amount, date, status } = formData;

      // Construye la referencia al documento del usuario en "users"
      const userRef = doc(db, "users", uid);

      // Verifica si el alumno ya existe en "collectionPayments"
      const paymentRef = doc(db, "collectionPayments", uid);
      const paymentSnapshot = await getDoc(paymentRef);

      if (paymentSnapshot.exists()) {
        // Si el alumno ya existe, agrega un nuevo pago al array `payments`
        const existingData = paymentSnapshot.data();
        const updatedPayments = [
          ...(existingData.payments || []),
          { amount, date: new Date(date), status },
        ];

        await updateDoc(paymentRef, {
          id: userRef, // Guarda la referencia al documento en "users"
          payments: updatedPayments,
          nextPayment: new Date(date), // Actualiza el próximo pago
        });
      } else {
        // Si el alumno no existe, crea un nuevo documento
        await setDoc(paymentRef, {
          id: userRef, // Guarda la referencia al documento en "users"
          uid, // Agrega el campo `uid`
          nextPayment: new Date(date),
          payments: [{ amount, date: new Date(date), status }],
          remainingPayments: 1, // Inicializa con 1 cuota restante
        });
      }

      // Actualiza la tabla
      setShowModal(false);
      setFormData({ uid: "", amount: 0, date: "", status: "pending" });
      alert("Pago agregado correctamente.");
    } catch (error) {
      console.error("Error al agregar el pago:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Cargando datos...</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Administración de Alumnos</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors mb-4"
      >
        + Agregar Pago
      </button>
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
              const nextPayment = payment.nextPayment;
              const remainingPayments = payment.remainingPayments;
              const paymentStatus = remainingPayments > 0 ? "Pendiente" : "Al día";

              return (
                <tr key={payment.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-800">{payment.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{nextPayment}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{remainingPayments}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{paymentStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar pagos */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Pago</h2>
            <select
              value={formData.uid}
              onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-md"
            >
              <option value="">Seleccionar Alumno</option>
              {activeUsers.map((user) => (
                <option key={user.uid} value={user.uid}>
                  {user.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Monto"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-md"
            >
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddPayment}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;