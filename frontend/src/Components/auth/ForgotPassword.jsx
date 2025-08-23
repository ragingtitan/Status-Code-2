import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/forgot", { email })
      .then((response) => {
        if (response.data.status === true) {
          toast.success("Password reset email sent to " + email);
          navigate("/signin");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-lg anim">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition duration-300"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center mt-5 text-gray-300">
          Go back to{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
