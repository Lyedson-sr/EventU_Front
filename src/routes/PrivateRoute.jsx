import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!auth.access) {
    console.log("Acesso negado. Redirecionando para login.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
