import MainContent from "./Components/MainContent";
import Settings from "./Components/Settings";
import StartPage from "./Components/StartPage";
import About from "./About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fileviewer from "./Components/Fileviewer";
import { AppContext } from "./Components/AppContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
function App() {
  const { isSessionActive, setIsRansomwareActive } = useContext(AppContext);
  return (
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            isSessionActive ? <Navigate to="/main" /> : <StartPage />
          } />
          <Route path="/main" element={
            isSessionActive ? <MainContent /> : <Navigate to="/" />
          } />
          <Route path="/settings" element={
            isSessionActive ? <Settings /> : <Navigate to="/" />
          } />
          <Route path="/about" element={
            <About/>
          } />
          <Route path="/file" element={
            isSessionActive ? <Fileviewer /> : <Navigate to="/" />
          
          }/>
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;
