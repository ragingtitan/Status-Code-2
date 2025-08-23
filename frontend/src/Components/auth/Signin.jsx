import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../utility/Loader";
import "react-toastify/dist/ReactToastify.css";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/signin",
        { email, password },
        { withCredentials: true }
      );

      if (data.status) {
        toast.success(data.message);
        if (!data.profile.preferences.preferenceFilled) {
          navigate("/jobforce/preferences");
        }
        else{
          navigate("/jobforce");
        }
      } else {
        console.log(data.message+"in signin");
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 shadow-lg rounded-lg border border-gray-800 anim">
        <h2 className="text-4xl font-extrabold text-center text-white">Welcome Back!</h2>
        <p className="text-center text-gray-300 text-lg">Sign in to your account</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button disabled={loader}
            type="submit"
            className="disabled:opacity-50 disabled:cursor-not-allowed w-full flex justify-center items-center gap-2 px-4 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300"
          >
            {loader ? <Loader special={false} /> : "Sign in"}
          </button>

          {/* Extra Options */}
          <div className="flex items-center justify-between mt-4">
            <Link className="text-md text-blue-400 hover:underline" to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>

          <p className="mt-4 text-center text-gray-400">
            Don’t have an account?{" "}
            <Link className="font-medium text-blue-400 hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
