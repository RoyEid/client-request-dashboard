import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;