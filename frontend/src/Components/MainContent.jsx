import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Icons from "./Icons";
import { useContext } from "react";
import { AppContext } from "./AppContext";

const MainContent = () => {
  const { isRansomwareActive } = useContext(AppContext);
  return (
    <div
      className="main-content bg-cover min-h-screen"
      style={{
        backgroundImage: isRansomwareActive
          ? "url(./src/assets/locked.png)":"url(./src/assets/wallpaper.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
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
