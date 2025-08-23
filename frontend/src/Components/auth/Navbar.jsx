import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext, useEffect, useRef } from "react";
import { FaTimes, FaSearch, FaBars } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import Search from "../auth/Search";
import ProfilePictureGenerator from "./ProfilePictureGenerator";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    profilePicture,
    isEmailVerified,
    isPhoneNumberVerified,
  } = useContext(AuthContext);
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  // Fetch profile picture when logged in
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = "http://localhost:4000/auth/profilepic";
        const response = await axios.get(url, {
          responseType: "blob",
          withCredentials: true,
        });
        if (response.status === 200) {
          const blob = response.data;
          const imageURL = URL.createObjectURL(blob);
          setImageSrc(imageURL);
        } else {
          toast.error(response.message);
          console.error(response.message);
        }
      } catch (error) {
        toast.error("Error fetching image: " + error.message);
        console.error("Error fetching image:", error.message);
      }
    };

    if (isLoggedIn) {
      fetchImage();
    }

    // Cleanup URL object when component unmounts
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [isLoggedIn, navigate]);

  // Logout handler
  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:4000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          toast.success("Logged out successfully");
          setIsLoggedIn(false);
          navigate("/signin");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Dropdown toggle for profile actions
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
    className={`fixed text-gray-200 w-full z-[1000] backdrop-blur-lg ${
      location.pathname.startsWith("/jobforce") || location.pathname=== "/*" ? "hidden" : ""
    }`}
  >
      {  console.log(isLoggedIn)
      }
      {/* Main Navbar */}
      <div className="flex flex-col">
        <nav
          className={`w-full shadow-md p-6 transition-all duration-500 ${
            toggleSearch ? "h-28" : "h-20"
          } flex items-center justify-between`}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpenMobileNavbar(!openMobileNavbar)}
            className={`md:hidden lg:hidden relative right-2 p-2 rounded-lg focus:outline-none ${openMobileNavbar?"none" : ""}`}
          >
            <FaBars className="" size={22} />
          </button>

          {/* Logo */}
          <div className="text-2xl md:text-3xl font-bold">
            <Link to={isLoggedIn ? "/jobforce" : "/"}>job<span className="text-yellow-400">force</span></Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex lg:flex items-center space-x-8">
            {["Overview", "Pricing", "Contact"].map((item, index) => (
              <Link
                key={index}
                to={item === "Overview" ? "/" : `/${item.toLowerCase()}`}
                className={`relative text-lg font-medium transition-colors duration-300 ${
                  location.pathname === (item === "Overview" ? "/" : `/${item.toLowerCase()}`)
                    ? "text-yellow-300"
                    : " hover:text-yellow-300"
                }`}
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            {/* Search Toggle */}
            <button
              onClick={() => setToggleSearch(!toggleSearch)}
              className="p-2 transition-transform duration-300 hover:rotate-12 focus:outline-none"
            >
              {toggleSearch ? <FaTimes size={18} /> : <FaSearch size={18} />}
            </button>
          </div>

          {/* CTA / Profile Section */}
          <div className="hidden md:flex lg:flex items-center space-x-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 bg-transparent text-black font-medium bg-yellow-400 border border-black text-gray-350 rounded-lg hover:bg-yellow-300 hover:text-white transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}

            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={toggleDropdown}
                  className="cursor-pointer rounded-full border-2 border-white hover:border-blue-400 transition duration-300"
                >
                  <div className="relative">
                    {(!profilePicture || !imageSrc) ? (
                      <ProfilePictureGenerator seed={username} width={40} />
                    ) : (
                      <img
                        src={imageSrc}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    {(isEmailVerified.isEmailVerified &&
                      isPhoneNumberVerified.isPhoneNumberVerified &&
                      profilePicture) && (
                      <MdVerified
                        size={20}
                        className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full"
                        title="Your account has been verified!"
                      />
                    )}
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-center rounded-lg shadow-lg text-black font-semibold p-3">
                    <Link
                      onClick={() => setIsDropdownOpen(false)}
                      to="/dashboard"
                      className={`block px-4 py-2 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors duration-200 ${
                        location.pathname === "/dashboard" ? "bg-indigo-500 text-white" : ""
                      }`}
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={() => setIsDropdownOpen(false)}
                      to="/settings"
                      className={`block px-4 py-2 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors duration-200 ${
                        location.pathname === "/settings" ? "bg-indigo-500 text-white" : ""
                      }`}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-center px-4 py-2 hover:bg-red-600 hover:text-white transition-colors rounded-lg duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Search Bar */}
        <div
          className={`w-full transition-all duration-500 overflow-hidden ${
            toggleSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full p-3">
            <Search />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Slide-In Panel) */}
      <div
        className={`fixed top-0 left-0 z-[10001] bg-white h-screen duration-150 ${
          openMobileNavbar ? "w-64 p-6" : "w-0 p-0 overflow-hidden"
        } md:hidden lg:hidden`}
      >
        <button
          onClick={() => setOpenMobileNavbar(!openMobileNavbar)}
          className={`${openMobileNavbar?"fixed":"hidden"} top-4 left-4 p-2 focus:outline-none`}
        >
          <FaTimes className="text-gray-200 duration-150 hover:text-black" size={24} />
        </button>
        <nav className="mt-16 flex flex-col space-y-4 text-center">
          <div className="text-3xl font-bold text-black mb-6">
            <Link onClick={() => setOpenMobileNavbar(false)} to={isLoggedIn ? "/jobforce" : "/"}>
            job<span className="text-yellow-400">force</span>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="mt-4">
              <div
                onClick={toggleDropdown}
                className="mx-auto w-20 h-20 rounded-xl overflow-hidden bg-white shadow-lg cursor-pointer border-4 border-gray-300 "
              >
                {(!profilePicture || !imageSrc) ? (
                  <ProfilePictureGenerator seed={username} />
                ) : (
                  <img
                    src={imageSrc}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                {(isEmailVerified.isEmailVerified &&
                  isPhoneNumberVerified.isPhoneNumberVerified &&
                  profilePicture) && (
                  <MdVerified
                    size={20}
                    className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full"
                    title="Your account has been verified!"
                  />
                )}
              </div>
              {isDropdownOpen && (
                <div className="mt-2 bg-white rounded-lg shadow-lg text-black font-semibold py-2">
                  <Link
                    onClick={() => setOpenMobileNavbar(false)}
                    to="/dashboard"
                    className={`block px-4 py-2 hover:bg-indigo-600 hover:text-white transition-colors duration-200 ${
                      location.pathname === "/dashboard" ? "bg-indigo-500 text-white" : ""
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => setOpenMobileNavbar(false)}
                    to="/settings"
                    className={`block px-4 py-2 hover:bg-indigo-600 hover:text-white transition-colors duration-200 ${
                      location.pathname === "/settings" ? "bg-indigo-500 text-white" : ""
                    }`}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {["Overview", "Pricing", "Contact"].map((item, index) => (
            <Link
              key={index}
              to={item === "Overview" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setOpenMobileNavbar(false)}
              className={`block px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-lg ${
                location.pathname === (item === "Overview" ? "/" : `/${item.toLowerCase()}`)
                  ? "bg-black text-white"
                  : "text-black hover:bg-black hover:text-white"
              }`}
            >
              {item}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/signup"
                onClick={() => setOpenMobileNavbar(false)}
                className="block px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-lg text-black hover:bg-black hover:text-white"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                onClick={() => setOpenMobileNavbar(false)}
                className="block px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-lg text-black hover:bg-black hover:text-white"
              >
                Sign In
              </Link>
            </>
          )}
          
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
