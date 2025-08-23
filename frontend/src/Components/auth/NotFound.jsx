import Not_Found from "../../assets/ChatGPT Image Apr 1, 2025, 11_17_58 AM.png";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{backgroundImage:`url(${Not_Found})`}} className={`min-h-screen lg:bg-cover bg-contain bg-center lg:bg-transparent bg-[#18191a] lg:bg-center bg-no-repeat  flex flex-col items-center justify-center text-white`}>
      <Link to="/" className="absolute bottom-40 text-white text-2xl font-bold hover:text-gray-300 transition duration-300"> 
        Home
      </Link>
      {/* <div className="relative top-60">
        <Link 
          onClick={goBack}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300"
        >
          Go Back
        </Link>
      </div> */}
    </div>
  );
};

export default NotFound;
