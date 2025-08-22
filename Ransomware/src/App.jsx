import MainContent from "./Components/MainContent";
import Settings from "./Components/Settings";
import StartPage from "./Components/StartPage";
import About from "./About";
import { DesktopProvider } from "./Components/AppContext";
import { AppContext } from "./Components/AppContext"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <DesktopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/main" element={<MainContent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </DesktopProvider>
  );
}

export default App;
