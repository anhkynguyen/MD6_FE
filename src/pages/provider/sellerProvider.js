import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { rentProvider } from "../../service/orderService";
import { getSellerProfile } from "../../service/userService";
import swal from "sweetalert";
import { getProviders } from "../../service/providerService";
import { getProvision } from "../../service/provisionService";

export default function SellerProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idUser } = useParams();

  console.log(idUser, 1);
  const user = useSelector((state) => state.user.currentUser);
  const provisions = useSelector((state) => state.provision.provisions);
  const post = useSelector((state) => {
    console.log(state, 999);
    return state.user.profile;
  });
  console.log(post[0], 11);
  const handleRent = (values) => {
    let data = {
      ...values,
      idUser: user.idUser,
      idPost: idUser,
    };
    console.log(data, 123);
    dispatch(rentProvider(data)).then((e) => {
      if (e.payload === "Wrong Check In") {
        swal("Wrong Check In");
      } else if (e.payload === "Wrong Check Out") {
        swal("Wrong Check Out");
      } else {
        dispatch(getProviders()).then(() => {
          swal("Order successfully");
          navigate("/home");
        });
      }
    });
  };
  useEffect(() => {
    dispatch(getSellerProfile(idUser));
    dispatch(getProvision());
  }, []);
  return (
    <Formik
      initialValues={{
        startTime: "",
        endTime: "",
        idProvision: "",
      }}
      onSubmit={(values) => {
        console.log(values, 22222);
        handleRent(values);
      }}
    >
      <Form>
        <>
          <div className="most-popular">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading-section">
                  <div>
                    <div class="starsec"></div>
                    <div class="starthird"></div>
                    <div class="starfourth"></div>
                    <div class="starfifth"></div>
                  </div>

                  <div class="col-lg-12">
                    <div class="page-content">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="main-profile ">
                            <div class="row">
                              <div class="row">
                                <div class="col-lg-4">
                                  <img
                                    src={post.image}
                                    alt=""
                                    style={{
                                      borderRadius: "23PX",
                                      width: "356px",
                                      height: "340px",
                                    }}
                                  />
                                </div>
                                <div class="col-lg-4 align-self-center">
                                  <ul>
                                    <li>
                                      Chiều cao <span>{post.height} cm</span>
                                    </li>
                                    <li>
                                      Cân nặng <span>{post.weight} kg</span>
                                    </li>
                                    <li>
                                      Số đo ba vòng{" "}
                                      <span>{post.measurement} cm</span>
                                    </li>
                                    <li>
                                      Giá thuê <span>{post.price} VND</span>
                                    </li>
                                  </ul>
                                </div>
                                <div class="col-lg-4 align-self-center">
                                  <ul>
                                    <li>
                                      Giới tính <span> {post.gender}</span>
                                    </li>
                                    <li>
                                      Ngày sinh <span>{post.birthday}</span>
                                    </li>
                                    <li>
                                      Email <span>{post.gmail}</span>
                                    </li>
                                    <li>
                                      Chức vụ <span>{post.role}</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      class="btn btn-primary btn-block logn-btn"
                      style={{ width: "30%", height: "50px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Thuê
                    </button>

                    <div
                      class="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">
                              {" "}
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            {" "}
                            <div class="form-row">
                              <div class="form-holder">
                                <h5 style={{ color: "#e75e8d" }}>
                                  Chọn dịch vụ
                                </h5>
                                <br></br>
                                <Field
                                  as="select"
                                  type="text"
                                  name={"idProvision"}
                                  id="idProvision"
                                  placeholder=""
                                  class="form-control"
                                >
                                  {provisions.map((item) => (
                                    <option value={item.idProvision}>
                                      {item.provisionName}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                              <div class="form-holder">
                                <h5 style={{ color: "#e75e8d" }}>
                                  Thời gian bắt đầu
                                </h5>
                                <br></br>
                                <Field
                                  type="datetime-local"
                                  name={"startTime"}
                                  id=""
                                  placeholder=""
                                  class="form-control"
                                />
                                <br></br>
                                <h5 style={{ color: "#e75e8d" }}>
                                  Thời gian kết thúc
                                </h5>
                                <br></br>
                                <Field
                                  type="datetime-local"
                                  name="endTime"
                                  id=""
                                  placeholder=""
                                  class="form-control"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              style={{ width: "48%" }}
                              class="btn btn-primary btn-block logn-btn"
                              data-bs-dismiss="modal"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              style={{ width: "48%" }}
                              class="btn btn-primary btn-block logn-btn"
                            >
                              Thuê
                            </button>
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
