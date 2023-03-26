import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import {Outlet} from "react-router-dom";
import ListTopProvider from "../provider/listTopProvider";

export default function Home() {
    return (
        <div className="row">
            <div className="col-12">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
}
