import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function User() {
  return (
    <div className="row">
      <div className="col-12" style={{ paddingTop: "0px" }}>
        <Navbar></Navbar>
        <br></br>
        <br></br>
        <br></br>

        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
}
