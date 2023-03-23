import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { register } from "../../service/userService";
import * as Yup from "yup";
const validateSchema = Yup.object().shape({
  username: Yup.string()
    .required("Vui lòng không để trống tên!")
    .min(6, "Tên phải từ 6 kí tự trở lên !")
    .max(50, "Tên chỉ dưới 50 kí tự"),
  password: Yup.string()
    .min(6, "Mật khẩu phải từ 6 kí tự trở lên !")
    .max(50, "Mật khẩu chỉ dưới 50 kí tự")
    .required("Vui lòng không để trống mật khẩu !"),
  gmail: Yup.string()
    .email("Vui lòng nhập đúng định dạng email!")
    .required("Vui lòng không để trống !"),
  birthday: Yup.string().required("Vui lòng không để trống !"),
  gender: Yup.string().required("Vui lòng không để trống !"),
});
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (values) => {
    let data = { ...values };
    console.log(222222, data);
    dispatch(register(data)).then((value) => {
      console.log(value.payload);
      if (value.payload === "Username already registered") {
        swal("Username already registered");
        navigate("/register");
      } else {
        swal("Register successfully");
        navigate("/");
      }
    });
  };
  return (
    <>
      <header class="top-header"></header>
      <Formik
        initialValues={{
          username: "",
          password: "",
          gmail: "",
          birthday: "",
          gender: "",
        }}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        <Form>
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
                <div class="col-lg-4 d-block mx-auto mt-4">
                  <div class="row">
                    <div class="col-xl-12 col-md-12 col-md-12">
                      <div class="card">
                        <div class="card-body wow-bg" id="formBg">
                          <h3 style={{ color: "pink" }}>Đăng Ký</h3>
                          <h5 style={{ color: "pink" }}>
                            Đăng ký tài khoản của bạn
                          </h5>
                          <br></br>
                          <p style={{ color: "white", float: "left" }}>
                            Họ tên
                          </p>
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"username"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group mb-2">
                            {" "}
                            <Field
                              type="text"
                              name={"username"}
                              id="username"
                              class="form-control textbox-dg"
                              placeholder="Nhập họ tên đầy đủ của bạn"
                              style={{ color: "white" }}
                            />{" "}
                          </div>
                          <p style={{ color: "white", float: "left" }}>
                            Mật khẩu
                          </p>
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"password"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group mb-1">
                            {" "}
                            <Field
                              name={"password"}
                              id="password"
                              type="password"
                              class="form-control textbox-dg"
                              placeholder="Nhập mật khẩu bạn chọn"
                              style={{ color: "white" }}
                            />{" "}
                          </div>
                          <p style={{ color: "white", float: "left" }}>
                            Ngày sinh
                          </p>{" "}
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"birthday"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group mb-0">
                            {" "}
                            <Field
                              name={"birthday"}
                              id="birthday"
                              type="date"
                              class="form-control textbox-dg"
                              style={{ color: "white" }}
                            />{" "}
                          </div>
                          <p style={{ color: "white", float: "left" }}>Email</p>
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"gmail"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group mb-0">
                            {" "}
                            <Field
                              name={"gmail"}
                              id="gmail"
                              type="email"
                              class="form-control textbox-dg"
                              placeholder="Nhập email của bạn"
                              style={{ color: "white" }}
                            />{" "}
                          </div>
                          <p style={{ color: "white", float: "left" }}>
                            Giới tính
                          </p>{" "}
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"gender"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group mb-0">
                            {" "}
                            <Field
                              name={"gender"}
                              id="gender"
                              as="select"
                              type="text"
                              class="form-control textbox-dg"
                              placeholder="Hãy chọn giới tính của bạn"
                              style={{ color: "white" }}
                            >
                              {" "}
                              <option value="Vui lòng chọn giới tính" selected>
                                Vui lòng chọn giới tính
                              </option>
                              <option value="Nam" selected>
                                Nam
                              </option>
                              <option value="Nữ">Nữ</option>
                              <option value="Khác">Khác</option>
                            </Field>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              {" "}
                              <button
                                type="submit"
                                class="btn btn-primary btn-block logn-btn"
                              >
                                Đăng ký
                              </button>{" "}
                            </div>
                            <div class="col-12">
                              <p>Bạn đã có tài khoản đăng nhập</p>{" "}
                              <Link to={"/"}>tại đây</Link>{" "}
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
