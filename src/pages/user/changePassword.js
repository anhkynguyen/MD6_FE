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
      if (e.payload === "Old password not true") {
        swal("Mật khẩu cũ không đúng");
      } else if (e.payload === "Success") {
        swal("Đổi mật khẩu thành công");
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
        </Form>
      </Formik>
    </>
  );
}
