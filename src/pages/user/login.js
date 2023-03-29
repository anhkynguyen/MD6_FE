import { ErrorMessage, Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/userService";
import { useEffect } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
const validateSchema = Yup.object().shape({
  gmail: Yup.string()
    .email("Vui lòng nhập đúng định dạng email !")
    .required("Vui lòng không để trống !"),
  password: Yup.string()
    .min(0, "Mật khẩu phải từ 6 kí tự trở lên !")
    .max(50, "Mật khẩu chỉ dưới 50 kí tự")
    .required("Vui lòng không để trống !"),
});
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    console.log(values);
    await dispatch(login(values)).then((e) => {
      console.log(e.payload);
      if (
        e.payload !== "User not found" ||
        e.payload !== "Wrong password" ||
        e.payload !== "your account has been locked"
      ) {
        navigate("/home");
      }
      if (e.payload === "User not found") {
        swal({
          title: "Tài khoản không tồn tại  !",
          icon: "error",
          text: "Bạn chưa có tài khoản hãy tạo tài khoản mới ngay bây giờ ",
        }).then(navigate("/"));
      }
      if (e.payload === "Wrong password") {
        swal({
          title: "Sai mật khẩu! Vui lòng nhập lại mật khẩu !",
          icon: "warning",
        }).then(navigate("/"));
      }
      if (e.payload === "your account has been locked") {
        swal({
          title:
            "Tài khoản chưa kích hoạt , Vui lòng liên hệ loc@gmail.com ! !",
          icon: "warning",
        }).then(navigate("/"));
      }
    });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Formik
      initialValues={{
        gmail: "",
        password: "",
      }}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        handleLogin(values);
      }}
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
                          <h3 style={{ color: "pink" }}>Đăng nhập</h3>
                          <h5 style={{ color: "pink" }}>
                            Đăng nhập bằng tài khoản của bạn
                          </h5>
                          <br></br>
                          <alert
                            className="text-danger"
                            style={{ float: "left" }}
                          >
                            <ErrorMessage name={"gmail"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group mb-3">
                            {" "}
                            <Field
                              type="text"
                              name="gmail"
                              class="form-control textbox-dg"
                              placeholder="Nhập email bạn đã đăng kí   "
                              style={{ color: "white" }}
                            />
                          </div>
                          <alert
                            style={{ float: "left" }}
                            className="text-danger"
                          >
                            <ErrorMessage name={"password"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group mb-4">
                            {" "}
                            <Field
                              type="password"
                              name="password"
                              class="form-control textbox-dg"
                              placeholder="Nhập mật khẩu "
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
                                Đăng nhập
                              </button>{" "}
                            </div>
                            <div class="col-12">
                              {" "}
                              <p>Bạn chưa có tài khoản đăng kí</p>
                              <Link to={"register"}>tại đây</Link>{" "}
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
      </Form>
    </Formik>
  );
}
