import React, { useState } from "react";
import { auth, db } from "../main"; // Importa Firebase Auth y Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";

async function getNextUserId(): Promise<string> {
  const counterRef = doc(db, "counters", "users");

  try {
    // Incrementar el contador de usuarios
    const counterDoc = await getDoc(counterRef);

    if (!counterDoc.exists()) {
      // Si el documento no existe, inicializarlo
      await setDoc(counterRef, { lastId: 1 });
      return "001";
    } else {
      const lastId = counterDoc.data()?.lastId || 0;
      const nextId = lastId + 1;

      // Actualizar el contador en Firestore
      await updateDoc(counterRef, { lastId: increment(1) });

      // Formatear el ID como un número de 3 dígitos (ejemplo: "001", "002")
      return nextId.toString().padStart(3, "0");
    }
  } catch (error) {
    console.error("Error al obtener el siguiente ID:", error);
    throw new Error("No se pudo generar un ID único");
  }
}

async function registerUser(email: string, password: string, name: string) {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verificar si el usuario está autenticado
    if (!auth.currentUser) {
      throw new Error("El usuario no está autenticado.");
    }

    // Obtener el siguiente ID autoincremental
    const userId = await getNextUserId();

    // Crear documento en Firestore
    await setDoc(doc(db, "users", userId), {
      email: user.email,
      name: name,
      role: "user", // Por defecto, el rol es "user"
      purchasedCourses: [] // Inicialmente no tiene cursos comprados
    });

    console.log(`Usuario registrado con ID ${userId} y guardado en Firestore`);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password, name);
      alert("Usuario registrado exitosamente");
    } catch (err: any) {
      setError(err.message);
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
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;