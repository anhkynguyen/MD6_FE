import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function Order() {
  return (
    <div className="row">
      <div className="col-12" style={{ paddingTop: "0px" }}>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
}
