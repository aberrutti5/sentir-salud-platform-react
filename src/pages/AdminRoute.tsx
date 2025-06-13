import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }: { children: JSX.Element }) {
  // Ya no se verifican roles de administrador con Firebase.
  // La ruta de administrador simplemente renderizará sus hijos.
  return children;
}

export default AdminRoute;