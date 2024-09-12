import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer position="top-right" />
      </BrowserRouter>
    </>
  );
}

export default App;
