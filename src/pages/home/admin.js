import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import NavbarAdmin from "../../components/navbarAdmin";

export default function Admin() {
  return (
    <div className="row">
      <div className="col-12">
        <NavbarAdmin></NavbarAdmin>

        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
}
