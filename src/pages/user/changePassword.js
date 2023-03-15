import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../service/userService";
import swal from "sweetalert";
import {Field, Form, Formik} from "formik";

export default function ChangePassword(){
    const {idUser} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const handleChangePassword = (value)=>{
        let data = [value , idUser]
        dispatch(changePassword(data)).then((e)=>{
            if (e.payload === "User not found") {
                swal("User not found");
            } else if (e.payload === "Old password does not match") {
                swal("Old password does not match");
            } else if (e.payload === "New password is match with old password") {
                swal("New password is match with old password");
            } else {
                swal("Change Password success");
                navigate("/");
            }

        })
    }
    return (
        <>
            <Formik initialValues={{
                oldPassword: '',
                newPassword: ''
            }} onSubmit={(values) => {
                handleChangePassword(values)
            }} enableReinitialize={true}
            >
                <Form>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-content">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="main-profile ">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <img
                                                            src={user.avatar}
                                                            alt=""
                                                            style={{borderRadius: "23PX"}}
                                                        />
                                                    </div>
                                                    <div className="col-lg-4 align-self-center">
                                                        <div className="main-info header-text">
                                                            <span>{user.status}</span>
                                                            <h4>{user.username}</h4>
                                                            <p>
                                                                Chọn người bạn muốn ghép đôi hoặc trở thành người
                                                                cung cấp dịch vụ ngay bây giờ
                                                            </p>
                                                            <div className="main-border-button">
                                                                <a href="/">Trở thành người cung cấp dịch vụ</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 align-self-center">
                                                        <ul>
                                                            <li>
                                                                Mật khẩu hiện tại: <Field style={{
                                                                width: "100%",
                                                                height: "40px",
                                                                borderRadius: "15px",
                                                                backgroundColor: "#1F2122",
                                                                color: "white",
                                                                borderColor: "white",
                                                            }} type="password" name={"oldPassword"}/>
                                                            </li>
                                                            <li>
                                                                Mật khẩu mới: <Field style={{
                                                                width: "100%",
                                                                height: "40px",
                                                                borderRadius: "15px",
                                                                backgroundColor: "#1F2122",
                                                                color: "white",
                                                                borderColor: "white",
                                                            }} type="password" name={"newPassword"}/>
                                                            </li>
                                                            <li>
                                                                <button style={{
                                                                width: "100%",
                                                                height: "40px",
                                                                borderRadius: "15px",
                                                                backgroundColor: "#1F2122",
                                                                color: "white",
                                                                borderColor: "white",
                                                                }} type="submit">Thay đổi</button>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="row"></div>
                                            </div>
                                        </div>
                                    </div>
                                    /
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>

            </Formik>

        </>
    );
}