import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./pages/user/login";
import Profile from "./pages/user/profile";
import Register from "./pages/user/register";

function App() {
  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path={""} element={<Login />}></Route>
          <Route path={"register"} element={<Register />}></Route>
          <Route path={"profile"} element={<Profile />}></Route>
          <Route path={"navbar"} element={<Navbar />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
