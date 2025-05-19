import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuthToken } from "./Token";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";

export const PageLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const token = getAuthToken();

      if (!token) {
        navigate("/auth");
      } else {
        toast.error("Network error. Please check your internet connection.");
      }
    }, 90000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex justify-center h-full py-20">
      <ScaleLoader
        color="#b5b5b5a4"
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
