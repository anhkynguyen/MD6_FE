import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword, getProfile } from "../../service/userService";
import swal from "sweetalert";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function ChangePassword() {
  const { idUser } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePassword = (value) => {
    let data = [value, idUser];
    console.log(data, 2);
    dispatch(changePassword(data)).then((e) => {
      if (e.payload === "Old password not true") {
        swal({ title: "Mật khẩu cũ không đúng ! !", icon: "error" });
      } else if (e.payload === "Success") {
        swal({ title: "Đổi mật khẩu thành công !", icon: "success" });
        navigate("/");
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
          swal({
            title: "Bạn có muốn thay đổi mật khẩu không",

            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              dispatch(handleChangePassword(values));
              swal({
                title: "Thay đổi mật khẩu thành công!",
                icon: "success",
              }).then(() => {
                navigate("/");
              });
            } else {
              swal({
                title: "Bạn đã hủy thao tác thay đổi mật khẩu!",
                icon: "error",
              });
              dispatch().then(() => {
                navigate("/home");
              });
            }
          });
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
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"oldPassword"}></ErrorMessage>
                            </alert>{" "}
                            <div class="input-group mb-3">
                              {" "}
                              <Field
                                type="password"
                                name="newPassword"
                                class="form-control textbox-dg"
                                placeholder="Nhập mật khẩu mới của bạn   "
                                style={{ color: "white" }}
                              />
                            </div>
                            <alert
                              style={{ float: "left" }}
                              className="text-danger"
                            >
                              <ErrorMessage name={"newPassword"}></ErrorMessage>
                            </alert>{" "}
                            {/* <div class="input-group mb-4">
                              {" "}
                              <Field
                                type="password"
                                name="re-Password"
                                class="form-control textbox-dg"
                                placeholder="Nhập lại mật khẩu mới của bạn "
                                style={{ color: "white" }}
                              />{" "}
                            </div> */}
                            <div class="row">
                              <div class="col-12">
                                {" "}
                                <button
                                  type="submit"
                                  class="btn btn-primary btn-block logn-btn"
                                >
                                  Đổi mật khẩu
                                </button>{" "}
                              </div>
                            </div>{" "}
                            <br></br>
                            <div>
                              {" "}
                              <p>Quay lại trang chủ</p>
                              <Link to={"/home"}>tại đây</Link>
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
    </>
  );
}
