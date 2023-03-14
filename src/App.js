import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import { useSelector } from "react-redux";
import Profile from "./pages/user/profile";
import User from "./pages/home/user";
import Home from "./pages/home/home";
import ListProvider from "./pages/provider/listProvider";
import Admin from "./pages/home/admin";
import ListUser from "./pages/user/listUser";

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
              <Route path={"home"} element={<Home />}>
                <Route path={""} element={<ListProvider />}></Route>
                {/* <Route path={"create-home"} element={<CreateHome/>}/>
              <Route path={"edit-home/:id"} element={<EditHome/>}/>
              <Route path={"rent-home/:id"} element={<RentHome/>}/>
              <Route path={"home-detail/:id"} element={<HomeDetail/>}/>
              <Route path={"my-home/:id"} element={<MyHome/>}/> */}
              </Route>
              <Route path={"user"} element={<User />}>
                <Route path={":idUser"} element={<Profile />}></Route>
                {/* <Route path={"change-password/:idUser"} element={<ChangePassword/>}></Route>
              <Route path={"my-order/:idUser"} element={<MyOrder/>}></Route>
              <Route path={"edit-order/:id"} element={<EditOrder/>}></Route> */}
              </Route>
              <Route path="admin" element={<Admin />}>
                <Route path={""} element={<ListProvider />}></Route>
                <Route path={"listUser"} element={<ListUser />}></Route>
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
