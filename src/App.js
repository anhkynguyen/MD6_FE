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
import ChangePassword from "./pages/user/changePassword";
import EditProvider from "./pages/provider/editProvider";
import AddProvider from "./pages/provider/addProvider";
import RentProvider from "./pages/provider/sellerProvider";
import SellerProfile from "./pages/provider/sellerProvider";
import ListTopProvider from "./pages/provider/listTopProvider";
import ListAddVip from "./pages/admin/listAddVip";
import ListOrderAdmin from "./pages/admin/listOrderAdmin";

import ListOrderUser from "./pages/order/listOrderUser";
import Order from "./pages/home/order";
import ListOrderSeller from "./pages/order/listOrderSeller";

function App() {
  const user = useSelector((state) => {
    return state.user.currentUser;
  });

  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path={""} element={<Login></Login>}></Route>
          <Route path={"register"} element={<Register></Register>}></Route>
          {user !== "User not found" ||
          user !== "Wrong password" ||
          user !== "your account has been locked" ? (
            <>
              <Route path={"home"} element={<Home />}>
                <Route path={""} element={<ListProvider />}></Route>
                <Route
                  path={"list-topProvider"}
                  element={<ListTopProvider />}
                />
                <Route path={"add-post"} element={<AddProvider />} />
                <Route path={"edit-post/:id"} element={<EditProvider />} />
              </Route>
              <Route path={"user"} element={<User />}>
                <Route path={":idUser"} element={<Profile />}></Route>
                <Route
                  path={"showSellerProfile/:idUser"}
                  element={<SellerProfile />}
                />
                <Route
                  path={"change-password/:idUser"}
                  element={<ChangePassword />}
                />
                <Route path={"list-vip"} element={<ListAddVip />} />
                <Route
                  path={"showSellerProfile/:idUser"}
                  element={<SellerProfile />}
                ></Route>

                <Route
                  path={"change-password/:idUser"}
                  element={<ChangePassword />}
                ></Route>
                <Route
                  path={"my-order/:idUser"}
                  element={<RentProvider />}
                ></Route>
              </Route>
              <Route path={"order"} element={<Order />}>
                <Route
                  path={"showOrderInUser/:idUser"}
                  element={<ListOrderUser />}
                />
                <Route
                  path={"showOrderInSeller/:idPost"}
                  element={<ListOrderSeller />}
                />
                <Route
                  path={"changeStatusOrder/:id"}
                  element={<ListOrderSeller />}
                />
                <Route path={"listOrder"} element={<ListOrderAdmin />} />
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
