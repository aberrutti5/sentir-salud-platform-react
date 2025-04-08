import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../main";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Cargando...</p>;
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;