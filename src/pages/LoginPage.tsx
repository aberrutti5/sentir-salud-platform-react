import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../main";
import { collection, query, where, getDocs } from "firebase/firestore";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Iniciando sesión con:", email); // Log para verificar el correo
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario autenticado:", user.uid); // Log para verificar el UID

      // Buscar el documento del usuario en Firestore por el campo `uid`
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const role = userDoc.data()?.role;
        console.log("Rol del usuario:", role); // Log para verificar el rol
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        console.log("El documento del usuario no existe.");
        setError("No se encontró información del usuario.");
      }
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-green-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;