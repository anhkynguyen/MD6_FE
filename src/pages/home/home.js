import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";

export default function Home() {
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
