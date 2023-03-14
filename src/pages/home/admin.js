import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function Admin() {
  return (
    <div className="row">
      <div className="col-12">
        <Navbar></Navbar>
        <hr />
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
}
