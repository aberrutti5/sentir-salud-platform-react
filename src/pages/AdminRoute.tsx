import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../main";
import { doc, getDoc } from "firebase/firestore";

function AdminRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          // Obtén el documento del usuario directamente por el UID (nombre del documento)
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const role = userDoc.data()?.role;
            console.log("Rol del usuario en AdminRoute:", role); // Log para depuración
            setIsAdmin(role === "admin");
          } else {
            console.log("El documento del usuario no existe en AdminRoute.");
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error al verificar el rol del usuario en AdminRoute:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  if (loading || isAdmin === null) return <p>Cargando...</p>; // Muestra un mensaje mientras se verifica el rol
  return isAdmin ? children : <Navigate to="/login" />;
}

export default AdminRoute;