import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    axios
      .post(`http://localhost:4000/auth/reset/${token}`, { password })
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          navigate("/signin");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md transition duration-300"
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

export default ResetPassword;
