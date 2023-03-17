import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../service/userService";
import swal from "sweetalert";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function ChangePassword() {
  const { idUser } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.currentUser);
  const handleChangePassword = (value) => {
    let data = [value, idUser];
    console.log(data, 2);
    dispatch(changePassword(data)).then((e) => {
      if (e.payload === "User not found") {
        swal("User not found");
      } else if (e.payload === "Old password does not match") {
        swal("Old password does not match");
      } else if (e.payload === "New password is match with old password") {
        swal("New password is match with old password");
      } else {
        swal("Change Password success");
        // navigate("/");
      }
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
        }}
        onSubmit={(values) => {
          handleChangePassword(values);
        }}
        enableReinitialize={true}
      >
        <Form>
          <>
            <header class="top-header"></header>

            <div id="mainCoantiner">
              <div class="main-header"></div>

              <div>
                <div class="starsec"></div>
                <div class="starthird"></div>
                <div class="starfourth"></div>
                <div class="starfifth"></div>
              </div>

              <div class="container text-center text-dark mt-5">
                <div class="row">
                  <div class="col-lg-4 d-block mx-auto mt-5">
                    <div class="row">
                      <div class="col-xl-12 col-md-12 col-md-12">
                        <div class="card">
                          <div class="card-body wow-bg" id="formBg">
                            <h3 style={{ color: "pink" }}>Đổi mật khẩu</h3>
                            <br />
                            <alert
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"oldPassword"}></ErrorMessage>
                            </alert>{" "}
                            <div class="input-group mb-3">
                              {" "}
                              <Field
                                type="password"
                                name="oldPassword"
                                class="form-control textbox-dg"
                                placeholder="Nhập mật khẩu cũ của bạn   "
                                style={{ color: "white" }}
                              />
                            </div>
                            <alert
                              style={{ float: "left" }}
                              className="text-danger"
                            >
                              <ErrorMessage name={"newPassword"}></ErrorMessage>
                            </alert>{" "}
                            <div class="input-group mb-4">
                              {" "}
                              <Field
                                type="password"
                                name="newPassword"
                                class="form-control textbox-dg"
                                placeholder="Nhập mật khẩu mới của bạn "
                                style={{ color: "white" }}
                              />{" "}
                            </div>
                            <div class="row">
                              <div class="col-12">
                                {" "}
                                <button
                                  type="submit"
                                  class="btn btn-primary btn-block logn-btn"
                                >
                                  Thay đổi
                                </button>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          {/*<div className="container">*/}
          {/*    <div className="row">*/}
          {/*        <div className="col-lg-12">*/}
          {/*            <div className="page-content">*/}
          {/*                <div className="row">*/}
          {/*                    <div className="col-lg-12">*/}
          {/*                        <div className="main-profile ">*/}
          {/*                            <div className="row">*/}
          {/*                                <div className="col-lg-4">*/}
          {/*                                    <img*/}
          {/*                                        src={user.avatar}*/}
          {/*                                        alt=""*/}
          {/*                                        style={{borderRadius: "23PX"}}*/}
          {/*                                    />*/}
          {/*                                </div>*/}
          {/*                                <div className="col-lg-4 align-self-center">*/}
          {/*                                    <div className="main-info header-text">*/}
          {/*                                        <span>{user.status}</span>*/}
          {/*                                        <h4>{user.username}</h4>*/}
          {/*                                        <p>*/}
          {/*                                            Chọn người bạn muốn ghép đôi hoặc trở thành người*/}
          {/*                                            cung cấp dịch vụ ngay bây giờ*/}
          {/*                                        </p>*/}
          {/*                                        <div className="main-border-button">*/}
          {/*                                            <a href="/">Trở thành người cung cấp dịch vụ</a>*/}
          {/*                                        </div>*/}
          {/*                                    </div>*/}
          {/*                                </div>*/}
          {/*                                <div className="col-lg-4 align-self-center">*/}
          {/*                                    <ul>*/}
          {/*                                        <li>*/}
          {/*                                            Mật khẩu hiện tại: <Field style={{*/}
          {/*                                            width: "100%",*/}
          {/*                                            height: "40px",*/}
          {/*                                            borderRadius: "15px",*/}
          {/*                                            backgroundColor: "#1F2122",*/}
          {/*                                            color: "white",*/}
          {/*                                            borderColor: "white",*/}
          {/*                                        }} type="password" name={"oldPassword"}/>*/}
          {/*                                        </li>*/}
          {/*                                        <li>*/}
          {/*                                            Mật khẩu mới: <Field style={{*/}
          {/*                                            width: "100%",*/}
          {/*                                            height: "40px",*/}
          {/*                                            borderRadius: "15px",*/}
          {/*                                            backgroundColor: "#1F2122",*/}
          {/*                                            color: "white",*/}
          {/*                                            borderColor: "white",*/}
          {/*                                        }} type="password" name={"newPassword"}/>*/}
          {/*                                        </li>*/}
          {/*                                        <li>*/}
          {/*                                            <button style={{*/}
          {/*                                            width: "100%",*/}
          {/*                                            height: "40px",*/}
          {/*                                            borderRadius: "15px",*/}
          {/*                                            backgroundColor: "#1F2122",*/}
          {/*                                            color: "white",*/}
          {/*                                            borderColor: "white",*/}
          {/*                                            }} type="submit">Thay đổi</button>*/}
          {/*                                        </li>*/}

          {/*                                    </ul>*/}
          {/*                                </div>*/}
          {/*                            </div>*/}
          {/*                            <div className="row"></div>*/}
          {/*                        </div>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*                /*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </Form>
      </Formik>
    </>
  );
}
