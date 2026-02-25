import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;