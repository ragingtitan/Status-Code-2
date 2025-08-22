import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Icons from "./Icons";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const MainContent = () => {
  return (
    <div
      className="main-content bg-cover min-h-screen"
      style={{
        backgroundImage: "url(./src/assets/wallpaper.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <Sidebar />
      <Icons />
    </div>
  );
};

export default MainContent;
