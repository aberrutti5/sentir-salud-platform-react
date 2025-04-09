import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../main";
import { collection, query, where, getDocs } from "firebase/firestore";

function AdminRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          // Buscar el documento del usuario por el campo `uid`
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
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

  if (loading || isAdmin === null) return <p>Cargando...</p>;
  return isAdmin ? children : <Navigate to="/login" />;
}

export default AdminRoute;