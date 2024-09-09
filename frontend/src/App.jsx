import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
       <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
