import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { register } from "../../service/userService";
import * as Yup from "yup";
const validateSchema = Yup.object().shape({
  username: Yup.string()
    .required("Vui lòng không để trống tên!")
    .min(5, "Tên phải từ 5 kí tự trở lên !")
    .max(50, "Tên chỉ dưới 50 kí tự"),
  password: Yup.string()
    .min(6, "Mật khẩu phải từ 6 kí tự trở lên !")
    .max(50, "Mật khẩu chỉ dưới 50 kí tự")
    .required("Vui lòng không để trống mật khẩu !"),
  gmail: Yup.string()
    .email("Vui lòng nhập đúng định dạng email!")
    .required("Vui lòng không để trống Email !"),
  birthday: Yup.string().required("Vui lòng không để trống ngaày sinh !"),
  gender: Yup.string().required("Vui lòng không để trống giới tính !"),
});
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (values) => {
    let data = { ...values };
    dispatch(register(data)).then((value) => {
      console.log(value);
      if (value.payload === "Username already registered") {
        swal("Tài khoản đã tồn tại !");
        navigate("/register");
      } else {
        navigate("/");
        swal({ title: "Đăng kí thành công !", icon: "success" });
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
          console.log(values);
          handleRegister(values);
        }}
      >
        <Form>
          <div id="mainCoantiner">
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
                          <div></div>
                          <h3 style={{ color: "pink" }}>Đăng Ký</h3>
                          <h5 style={{ color: "pink" }}>
                            Đăng ký tài khoản của bạn
                          </h5>
                          <br></br>
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
                          <div class="input-group mb">
                            <Field
                              type="text"
                              name={"username"}
                              id="username"
                              class="form-control textbox-dg"
                              placeholder="Nhập họ tên đầy đủ của bạn"
                              style={{ color: "white" }}
                            />{" "}
                          </div>
                          <br />
                          <p style={{ color: "white", float: "left" }}>
                            Mật khẩu
                          </p>
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"password"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group ">
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
                          <br />
                          <p style={{ color: "white", float: "left" }}>
                            Ngày sinh
                          </p>{" "}
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"birthday"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group ">
                            {" "}
                            <Field
                              name={"birthday"}
                              id="birthday"
                              type="date"
                              class="form-control textbox-dg"
                              style={{ color: "white" }}
                            />{" "}
                          </div>
                          <br />
                          <p style={{ color: "white", float: "left" }}>Email</p>
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"gmail"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group ">
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
                          <br />
                          <p style={{ color: "white", float: "left" }}>
                            Giới tính
                          </p>{" "}
                          <alert
                            className="text-danger"
                            style={{ float: "right" }}
                          >
                            <ErrorMessage name={"gender"}></ErrorMessage>
                          </alert>{" "}
                          <div class="input-group ">
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
