import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Make sure to install react-icons

const GoBack = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={`${
        isLoggedIn ? "fixed z-50" : "hidden"
      } left-4 top-20`}
    >
      <button
        onClick={goBack}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 text-white font-medium px-4 py-2 rounded-full shadow-lg shadow-indigo-800/20 hover:shadow-indigo-800/40"
      >
        <FaArrowLeft className="text-sm" />
        <span className="lg:block hidden">Go Back</span>
      </button>
    </div>
  );
};

export default GoBack;
