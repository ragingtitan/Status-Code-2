import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Icons from "./Icons";

const MainContent = () => {
  return (
    <div className="main-content bg-cover min-h-screen" style={{backgroundImage:"url(./src/assets/wallpaper.jpg)", backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
        <Navbar/>
        <Sidebar/>
        <Icons/>
    </div>
  )
}

export default MainContent