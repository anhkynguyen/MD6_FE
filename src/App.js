import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import { useSelector } from "react-redux";
import Profile from "./pages/user/profile";
import User from "./pages/home/user";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path={""} element={<Login></Login>}></Route>
          <Route path={"register"} element={<Register></Register>}></Route>
          {user !== "User not found" || user !== "Wrong password" ? (
            <>
              <Route path={"user"} element={<User />}>
                <Route path={":idUser"} element={<Profile />}></Route>
              </Route>
            </>
          ) : (
            <>
              <Route path={"/"} element={<Login></Login>}></Route>
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
