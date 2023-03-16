import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/userService";
import { useEffect } from "react";
import swal from "sweetalert";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    await dispatch(login(values)).then((e) => {
      if (e.payload !== "User not found" && e.payload !== "Wrong password") {
        navigate("/home");
      }
      if (e.payload === "User not found") {
        swal("Tài khoản không tồn tại !!!");
      }
      if (e.payload === "Wrong password") {
        swal("Sai mật khẩu! Vui lòng nhập lại mật khẩu !");
      }
      if (e.payload === "your account has been locked") {
        swal("Tài khoản chưa kích hoạt! Vui lòng liên hệ quản trị viên !");
        navigate("/");
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          gmail: "",
          password: "",
        }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        <Form>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="page-content">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="main-profile ">
                        <div class="row">
                          <div class="col-lg-5">
                            <img
                              src="https://media.travelmag.vn/resize/800x564/files/linhhuong/2020/09/27/sept-commercial-cqu3ddnwtkq-unsplash-1743.jpg"
                              alt=""
                              style={{ borderRadius: "23px", height: "400px" }}
                            />
                          </div>

                          <div class="col-lg-7 align-self-center">
                            <div class="main-info header-text">
                              <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>
                              <br></br>
                              <h4 style={{ color: "white" }}>Email</h4>
                              <Field
                                type="email"
                                name="gmail"
                                style={{
                                  width: "80%",
                                  height: "40px",
                                  borderRadius: "15px",
                                  backgroundColor: "#1F2122",
                                  color: "white",
                                  borderColor: "white",
                                }}
                              ></Field>
                              <br />
                              <br />
                              <h4 style={{ color: "white" }}>Mật khẩu</h4>
                              <Field
                                name="password"
                                style={{
                                  width: "80%",
                                  height: "40px",
                                  borderRadius: "15px",
                                  backgroundColor: "#1F2122",
                                  color: "white",
                                  borderColor: "white",
                                }}
                                type="password"
                              ></Field>
                              <div class="main-border-button border-no-active ">
                                <button
                                  style={{
                                    width: "20%",
                                    height: "40px",
                                    borderRadius: "15px",
                                    backgroundColor: "#1F2122",
                                    color: "white",
                                    borderColor: "white",
                                  }}
                                >
                                  Đăng nhập
                                </button>
                              </div>
                              <h6>
                                {" "}
                                Bạn chưa có tài khoản đăng kí tại đây{" "}
                                <Link to={"register"} style={{ color: "red" }}>
                                  {" "}
                                  Đăng ký{" "}
                                </Link>
                              </h6>
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
        </Form>
      </Formik>
    </>
  );
}
