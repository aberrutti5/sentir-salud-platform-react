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
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // Estado para los usuarios filtrados

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentsRef = collection(db, "collectionPayments");
        const paymentsSnapshot = await getDocs(paymentsRef);

        const paymentsData = await Promise.all(
          paymentsSnapshot.docs.map(async (paymentDoc) => {
            const paymentData = paymentDoc.data();

            let userName = "Usuario no encontrado";
            if (paymentData.name instanceof Object) {
              try {
                const userSnapshot = await getDoc(paymentData.name);
                if (userSnapshot.exists()) {
                  userName = userSnapshot.data().name || "Sin nombre";
                }
              } catch (error) {
                console.error("Error al resolver la referencia de `name`:", error);
              }
            } else {
              userName = paymentData.name || "Sin nombre";
            }

            return {
              id: paymentDoc.id,
              name: userName,
              payments: paymentData.payments || [],
              nextPayment: paymentData.nextPayment || null,
            };
          })
        );

        console.log("Datos de pagos:", paymentsData); // Depuración
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error al obtener los datos de pagos:", error);
      } finally {
        setLoading(false); // Asegúrate de que `loading` se actualice
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "collectionPayments");
        const usersSnapshot = await getDocs(usersRef);

        const usersData = await Promise.all(
          usersSnapshot.docs.map(async (doc) => {
            const userData = doc.data();
            let userName = "Sin nombre";

            if (userData.name instanceof Object) {
              try {
                const userSnapshot = await getDoc(userData.name);
                if (userSnapshot.exists()) {
                  userName = userSnapshot.data().name || "Sin nombre";
                }
              } catch (error) {
                console.error("Error al resolver la referencia de `name`:", error);
              }
            } else {
              userName = userData.name || "Sin nombre";
            }

            return {
              uid: doc.id,
              name: userName,
            };
          })
        );

        setActiveUsers(usersData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = activeUsers.filter((user) => {
      const userName = typeof user.name === "string" ? user.name : "";
      return userName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [searchTerm, activeUsers]);

  useEffect(() => {
    console.log("Usuarios activos:", activeUsers);
  }, [activeUsers]);

  const handleAddPayment = async () => {
    try {
      const { uid, amount, date, status } = formData;

      // Construye la referencia al documento del usuario en "collectionPayments"
      const paymentRef = doc(db, "collectionPayments", uid);
      const paymentSnapshot = await getDoc(paymentRef);

      if (paymentSnapshot.exists()) {
        // Si el documento ya existe, agrega un nuevo pago al array `payments`
        const existingData = paymentSnapshot.data();
        const updatedPayments = [
          ...(existingData.payments || []),
          { amount, date: new Date(date), status },
        ];

        await updateDoc(paymentRef, {
          payments: updatedPayments, // Actualiza el array de pagos
          nextPayment: new Date(date), // Actualiza la fecha del próximo pago
        });
      } else {
        // Si el documento no existe, crea uno nuevo con el primer pago
        await setDoc(paymentRef, {
          uid, // ID del usuario
          payments: [{ amount, date: new Date(date), status }], // Inicializa el array de pagos
          nextPayment: new Date(date), // Establece la fecha del próximo pago
        });
      }

      // Actualiza la tabla y cierra el modal
      setShowModal(false);
      setFormData({ uid: "", amount: 0, date: "", status: "pending" });
      alert("Pago agregado correctamente.");
    } catch (error) {
      console.error("Error al agregar el pago:", error);
      alert("Hubo un error al agregar el pago. Por favor, inténtalo de nuevo.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Cargando datos...</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Administración de Alumnos</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors mb-4">
        + Agregar Pago
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Próximo Pago</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Cantidad de Pagos</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-800">{payment.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {payment.nextPayment
                      ? new Date(payment.nextPayment.seconds * 1000).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{payment.payments.length}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 py-4">
                  No hay pagos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar pagos */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Agregar Pago</h2>

            {/* Campo para seleccionar usuario */}
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

            {/* Campo para ingresar monto */}
            <input
              type="number"
              placeholder="Monto"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />

            {/* Campo para ingresar fecha */}
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-md"
            />

            {/* Campo para seleccionar estado */}
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-md"
            >
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
            </select>

            {/* Botones */}
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