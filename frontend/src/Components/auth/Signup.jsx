import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent empty submissions
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:4000/auth/signup", formData);

      if (data.status) {
        toast.success(data.message);
        navigate("/signin");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="max-w-md w-full space-y-8 bg-gray-900 shadow-lg border border-gray-800 p-8 rounded-lg anim">
        <h2 className="text-4xl font-extrabold text-center">Create Your Account</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button disabled={loading}
            type="submit"
            className="disabled:opacity-50 disabled:cursor-not-allowed w-full flex justify-center py-3 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Extra Options */}
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link className="font-medium text-blue-400 hover:underline" to="/signin">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
