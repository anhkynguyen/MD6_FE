
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";


export default function User() {
    return (
        <div className="row">
            <div className="col-12">
                <Navbar></Navbar>
                <hr/>
                <Outlet></Outlet>

            </div>
        </div>
    )
}