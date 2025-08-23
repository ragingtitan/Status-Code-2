import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { MdVerified, MdDelete } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import ProfilePictureGenerator from "./ProfilePictureGenerator";
import GoBack from "../utility/GoBack";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    dashboardEmail,
    dashboardBio,
    setdashboardBio,
    dashboardphoneNumber,
    setdashboardphoneNumber,
    profilePicture,
    isEmailVerified,
    isPhoneNumberVerified,
    dashboardCountryCode,
    setdashboardCountryCode,
    isAdmin,
    setisAdmin,
  } = useContext(AuthContext);

  const [hasChanged, sethasChanged] = useState(false);
  const [formdata, setformdata] = useState({
    bio: dashboardBio || "",
    phoneNumber: dashboardphoneNumber || "",
    countryCode: dashboardCountryCode || 91,
  });
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [getOTP, setgetOTP] = useState("");
  const [getMessageOTP, setgetMessageOTP] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleMessageOTPChange = (e) => {
    setgetMessageOTP(e.target.value);
  };
  const handleOTPChange = (e) => {
    setgetOTP(e.target.value);
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const url = "http://localhost:4000/auth/updateProfile/";
      let response = await axios.post(url, formdata);
      if (response.data.status) {
        const { bio, phoneNumber, countryCode } = response.data.details;
        setdashboardBio(bio);
        setdashboardphoneNumber(phoneNumber);
        setdashboardCountryCode(countryCode);
        setformdata({ bio, phoneNumber, countryCode });
        sethasChanged(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    sethasChanged(true);
    setformdata((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const url = "http://localhost:4000/auth/verify/";
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        if (response.data.status) {
          setIsLoggedIn(true);
          setformdata({
            bio: response.data.details.bio || "",
            phoneNumber: response.data.details.phoneNumber || "",
            countryCode: response.data.details.countryCode || 91,
          });
        } else {
          setIsLoggedIn(false);
          toast.error(response.data.message);
          navigate("/signin");
        }
      })
      .catch((err) => {
        toast.error(err.message);
        navigate("/signin");
      });
  }, [dashboardBio, dashboardphoneNumber, navigate, setIsLoggedIn]);

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
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } else {
          toast.error("Error fetching the image.");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (isLoggedIn) {
      fetchImage();
    } else {
      setImageSrc(null);
    }
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [isLoggedIn]);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const uploadProfilePicture = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("uploaded_file", file);
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/uploadProfilePic",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("File uploaded:", response.data);
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file.");
    }
  };

  const handleDeleteProfilePicture = () => {
    try {
      const url = "http://localhost:4000/auth/deleteProfilePicture";
      axios
        .get(url, { withCredentials: true })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSendMessageOTP = () => {
    const url = "http://localhost:4000/auth/sendMessage";
    axios
      .post(
        url,
        {
          email: dashboardEmail,
          phoneNumber: dashboardphoneNumber,
          countryCode: countryCode,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          setgetOTP("");
          setgetMessageOTP("");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err.message);
      });
  };

  const handleSendOTP = async () => {
    try {
      const url = "http://localhost:4000/auth/sendMail/";
      const response = await axios.post(
        url,
        { email: dashboardEmail },
        { withCredentials: true }
      );
      if (response.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCheckOTP = async () => {
    try {
      const url = "http://localhost:4000/auth/checkOTP";
      axios
        .post(
          url,
          { email: dashboardEmail, otp: getOTP },
          { withCredentials: true }
        )
        .then((response) => {
          response.data.status
            ? toast.success(response.data.message)
            : toast.error(response.data.message);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCheckMessageOTP = async () => {
    try {
      const url = "http://localhost:4000/auth/checkMessageOTP";
      axios
        .post(
          url,
          { email: dashboardEmail, otp: getMessageOTP },
          { withCredentials: true }
        )
        .then((res) => {
          res.data.status
            ? toast.success(res.data.message)
            : toast.error(res.data.message);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden py-12">
      <div className="container mx-auto px-4">
        <GoBack />
        <form
          className="border border-gray-700 shadow-xl rounded-lg p-8 mx-auto max-w-3xl mt-16 bg-gray-800 bg-opacity-80"
          onSubmit={updateProfile}
        >
          <div className="profile-container flex flex-col items-center gap-6">
            <h1 className="text-4xl font-extrabold text-white text-center">
              Profile
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
              <div
                className={`${
                  isEmailVerified.isEmailVerified &&
                  isPhoneNumberVerified.isPhoneNumberVerified &&
                  profilePicture
                    ? "relative"
                    : "flex justify-center"
                } profile-picture border-2 border-blue-500 overflow-hidden w-1/3 bg-gray-200 p-4 rounded-lg shadow-md`}
              >
                {!profilePicture ? (
                  <ProfilePictureGenerator seed={username} width={95} />
                ) : (
                  <img src={imageSrc} alt="Profile" className="object-cover" />
                )}
                <div
                  className={`${
                    isEmailVerified.isEmailVerified &&
                    isPhoneNumberVerified.isPhoneNumberVerified &&
                    profilePicture
                      ? "absolute top-1 right-1 cursor-pointer z-20"
                      : "hidden"
                  }`}
                >
                  <MdVerified
                    className="text-2xl"
                    title="Your account has been verified!"
                    style={{ color: "#4285f4" }}
                  />
                </div>
              </div>

              <div
                className={`flex items-center justify-center my-3 ${
                  profilePicture ? "hidden" : ""
                }`}
              >
                <label
                  htmlFor="upload-button"
                  className="bg-blue-500 text-white rounded-full text-2xl font-bold py-2 px-4 cursor-pointer"
                >
                  +
                </label>
                <input
                  id="upload-button"
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={uploadProfilePicture}
                  className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Upload Photo
                </button>
              </div>
              <button
                title="Delete Profile Picture"
                onClick={handleDeleteProfilePicture}
                className={`p-2 rounded mt-2 text-sm ${
                  profilePicture ? "" : "hidden"
                }`}
              >
                <MdDelete className="text-red-500 text-2xl" />
              </button>
            </div>

            <div className="mt-6 flex flex-col text-lg text-gray-300 w-full">
              <div className="flex flex-col sm:flex-row gap-2 justify-start items-center">
                <span className="font-bold">Username:</span>
                <span>{username}</span>
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <div className="flex items-center gap-4">
                  <span className="font-bold">Email:</span>
                  <div className="flex items-center gap-3">
                    <input
                      className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                      style={{ width: `${dashboardEmail.length * 9.9}px` }}
                      type="text"
                      value={dashboardEmail}
                      readOnly
                    />
                    <FiCheckCircle
                      title={`${dashboardEmail} is verified!`}
                      className={`${
                        isEmailVerified.isEmailVerified
                          ? "text-2xl text-green-600"
                          : "hidden"
                      }`}
                    />
                    <button
                      onClick={handleSendOTP}
                      className={`bg-green-600 text-white text-base p-2 rounded ${
                        isEmailVerified.isEmailVerified ? "hidden" : ""
                      }`}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
                <div
                  className={`flex gap-3 ${
                    isEmailVerified.isEmailVerified ? "hidden" : ""
                  }`}
                >
                  <input
                    className="p-2 rounded bg-gray-700 text-white"
                    type="text"
                    value={getOTP}
                    onChange={handleOTPChange}
                    placeholder="Enter OTP"
                  />
                  <button
                    onClick={handleCheckOTP}
                    className={`bg-green-600 text-white p-2 rounded ${
                      getOTP.length === 0 ? "hidden" : ""
                    }`}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full space-y-6 mt-6">
              <div className={`flex flex-col sm:flex-row gap-3 text-lg text-gray-300`}>
                <label className="font-bold" htmlFor="phoneNumber">
                  Phone Number:
                </label>
                <div className="flex gap-4 items-center">
                  <select
                    className={`${
                      isPhoneNumberVerified.isPhoneNumberVerified ? "hidden" : ""
                    } country-code w-fit rounded py-3 px-2 bg-gray-700`}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="1">USA (+1)</option>
                    <option value="91">India (+91)</option>
                    <option value="44">UK (+44)</option>
                    <option value="81">Japan (+81)</option>
                    <option value="49">Germany (+49)</option>
                  </select>
                  <input
                    value={formdata.phoneNumber}
                    className={`${
                      isPhoneNumberVerified.isPhoneNumberVerified ? "hidden" : ""
                    } p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500`}
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                  />
                  <div
                    className={`p-3 rounded bg-gray-700 text-white focus:outline-none ${
                      isPhoneNumberVerified.isPhoneNumberVerified ? "" : "hidden"
                    }`}
                  >
                    +{dashboardCountryCode} {dashboardphoneNumber}
                  </div>
                  <FiCheckCircle
                    className={`${
                      isPhoneNumberVerified.isPhoneNumberVerified
                        ? "text-2xl text-green-600"
                        : "hidden"
                    }`}
                    title={`+${dashboardCountryCode} ${dashboardphoneNumber} is verified!`}
                  />
                  <button
                    onClick={handleSendMessageOTP}
                    className={`${
                      isPhoneNumberVerified.isPhoneNumberVerified ? "hidden" : ""
                    } bg-green-600 text-base text-white p-2 rounded ${
                      formdata.phoneNumber !== "" ? "block" : "hidden"
                    }`}
                  >
                    Send OTP
                  </button>
                </div>
                <div
                  className={`flex gap-3 ${
                    isPhoneNumberVerified.isPhoneNumberVerified ? "hidden" : ""
                  }`}
                >
                  <input
                    className="p-2 rounded bg-gray-700 text-white"
                    type="text"
                    value={getMessageOTP}
                    onChange={handleMessageOTPChange}
                    placeholder="Enter OTP"
                  />
                  <button
                    onClick={handleCheckMessageOTP}
                    className={`bg-green-600 text-white p-2 rounded ${
                      getMessageOTP.length === 0 ? "hidden" : ""
                    }`}
                  >
                    Verify
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-lg text-gray-300">
                <label className="font-bold" htmlFor="bio">
                  Bio:
                </label>
                <textarea
                  value={formdata.bio}
                  name="bio"
                  placeholder="Tell us something about yourself..."
                  className={`p-3 rounded bg-gray-700 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    formdata.bio === "" ? "ring-2 ring-indigo-500" : ""
                  }`}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
            <button
              disabled={!hasChanged}
              className="bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed p-4 mt-6 rounded-md text-white hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
