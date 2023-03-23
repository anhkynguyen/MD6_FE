import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import { getSellerProfile } from "../../service/userService";
import {addOrder} from "../../service/orderService";
import {Field, Form, Formik} from "formik";

export default function SellerProfile() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state)=>{
    return state.user.currentUser
  })
  const post = useSelector((state) => {

    return state.user.profile;
  });
  console.log(idUser)

  useEffect(() => {
    dispatch(getSellerProfile(idUser));
  }, []);
  const handlerAddOrder = (values) => {
    let data = { ...values, user: user.idUser };
    dispatch(addOrder(data)).then(() => {
      navigate("/home");
    });
  };
  return (
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
                {user.role !== "user"?
                        (<Link to={"/order/showOrderInSeller/" + idUser}>
                          <button type="button"
                                  className="btn btn-primary btn-block logn-btn">Gio hang</button></Link>)
                  :
                    (<Formik initialValues={{
                      namePost: "",
                      starTime: "",
                      endTime: ""
                    }}
                            onSubmit={(values) => {
                              values.idUser = user.idUser;
                              handlerAddOrder(values);
                            }}>
                      <Form>
                        <button
                            type="button"
                            className="btn btn-primary btn-block logn-btn"
                            style={{width: "30%", height: "50px"}}
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                        >
                          Thuê
                        </button>

                        <div
                            className="modal fade"
                            id="staticBackdrop"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                  {" "}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                {" "}
                                <div className="form-row">
                                  <div className="form-holder">
                                    <h5 style={{color: "#e75e8d"}}>Chọn dịch vụ</h5>
                                    <br></br>
                                    <Field
                                        type="text"
                                        name={"namePost"}
                                        id="namePost"
                                        placeholder="Tên bài đăng"
                                        className="form-control"
                                    />
                                  </div>
                                  <div className="form-holder">
                                    <h5 style={{color: "#e75e8d"}}>
                                      Thời gian bắt đầu
                                    </h5>
                                    <br></br>
                                    <Field
                                        type="datetime-local"
                                        name={"starTime"}
                                        id="starTime"
                                        placeholder=""
                                        className="form-control"
                                    />
                                    <br></br>
                                    <h5 style={{color: "#e75e8d"}}>
                                      Thời gian kết thúc
                                    </h5>
                                    <br></br>
                                    <Field
                                        type="datetime-local"
                                        name="endTime"
                                        id="endTime"
                                        placeholder=""
                                        className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                    type="button"
                                    style={{width: "48%"}}
                                    className="btn btn-primary btn-block logn-btn"
                                    data-bs-dismiss="modal"
                                >
                                  Hủy
                                </button>
                                <button
                                    type="submit"
                                    style={{width: "48%"}}
                                    className="btn btn-primary btn-block logn-btn">
                                  Thuê
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Formik>)
                }





              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
