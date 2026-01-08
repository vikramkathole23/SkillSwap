import { useRef } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const isAuthenticated = token ? true : false;
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error("Please,Login First!");
      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return children;
}

export default ProtectedRoute;
