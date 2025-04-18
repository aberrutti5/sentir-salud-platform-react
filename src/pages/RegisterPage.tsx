import React, { useState } from "react";
import { auth, db } from "../main"; // Importa Firebase Auth y Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

async function registerUser(email: string, password: string, name: string) {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Crear documento en Firestore con el UID como nombre del documento
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: name,
      role: "user", // Por defecto, el rol es "user"
    });

    // Crear documento en base de datos de pagos
    await setDoc(doc(db, "collectionPayments", user.uid), {
      uid: user.uid,
      name: doc(db, "users", user.uid), // Referencia al campo name de la colección users
      payments: [], // Inicializa el array de pagos
      modalidad: "", // Inicializa la modalidad
      //nextPayment: null, // Inicializa el próximo pago
    });

    console.log("Usuario registrado y guardado en Firestore con UID:", user.uid);
    return user; // Devuelve el usuario registrado
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate(); // Hook para redirigir

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Activa el estado de carga
    setError(""); // Limpia errores previos
    try {
      const user = await registerUser(email, password, name);
      console.log("Usuario registrado:", user);
      navigate("/"); // Redirige a la página principal
    } catch (err: any) {
      setError(err.message); // Muestra el error
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Registro</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            disabled={loading} // Deshabilita el campo mientras carga
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            disabled={loading} // Deshabilita el campo mientras carga
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            disabled={loading} // Deshabilita el campo mientras carga
          />
        </div>
        <button
          type="submit"
          className={`w-full px-6 py-3 rounded-md transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          disabled={loading} // Deshabilita el botón mientras carga
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}

export default Register;