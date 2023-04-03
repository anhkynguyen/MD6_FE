import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addOrder } from "../../service/orderService";
import { getSellerProfile } from "../../service/userService";
import swal from "sweetalert";
import { getProviders } from "../../service/providerService";
import { getProvision } from "../../service/provisionService";
import { addComment } from "../../service/commentService";
import { getAllComment } from "../../service/commentService";
import { object } from "yup";
import { getPersonalByIdUser } from "../../service/personalService";

export default function SellerProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idUser } = useParams();
  const idUserPersonal = useSelector((state) => {
    console.log(state.user.profile.idUser);
    return state.user.profile.idUser;
  });

  const comment = useSelector((state) => {
    return state.comment.comments;
  });
  const user = useSelector((state) => state.user.currentUser);
  const provisions = useSelector((state) => state.personal.provisions);

  const post = useSelector((state) => {
    return state.user.profile;
  });

  const handleRent = (values) => {
    let data = {
      ...values,
      idUser: user.idUser,
      idPost: idUser,
    };

    dispatch(addOrder(data)).then((e) => {
      if (e.payload == "Bạn chưa thể thuê dịch vụ") {
        swal({
          title: "Thời gian này đã có người thuê vui lòng chọn lại",
          icon: "error",
        });
      }
      if (e.payload == "hãy chọn lại thời gian bắt đầu thuê") {
        swal({
          title: "Chọn lại thời gian bắt đầu thuê !",
          icon: "warning",
        }).then();
      }
      if (e.payload == "hãy chọn lại ngày bắt đầu thuê") {
        swal({
          title: "Hãy chọn lại ngày bắt đầu thuê ! !",
          icon: "warning",
        }).then();
      }
      if (e.payload == "Hãy chọn lại ngày thuê dịch vụ") {
        swal({
          title: "Hãy chọn lại ngày thuê dịch vụ ! !",
          icon: "warning",
        }).then();
      }

      if (typeof e.payload === object) {
        swal({
          title: "ok",
          icon: "warning",
        }).then();
      }
    });
  };
  const handleAddComment = (values) => {
    console.log(values);
    let dataComment = {
      ...values,
      idUser: user.idUser,
      idPost: idUser,
    };
    dispatch(addComment(dataComment));
  };
  useEffect(() => {
    dispatch(getPersonalByIdUser(idUserPersonal));
  }, [idUserPersonal]);
  useEffect(() => {
    dispatch(getSellerProfile(idUser));
  }, []);
  useEffect(() => {
    dispatch(getAllComment());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="heading-section">
            {" "}
            <div>
              <div class="starsec"></div>
              <div class="starthird"></div>
              <div class="starfourth"></div>
              <div class="starfifth"></div>
            </div>
            <div class="col-lg-12">
              <div class="page-content">
                {/* <h2 style={{ textAlign: "center" }}> {post.namePost}</h2> */}
                <div class="row">
                  <div class="col-12" style={{ paddingTop: "0px" }}>
                    <div
                      class="main-profile"
                      style={{
                        paddingBottom: "20px",
                        paddingTop: "20px",
                        margin: "200px",
                        marginBottom: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <div class="row">
                        <div class="row">
                          <div class="col-4">
                            <img
                              src={post.image}
                              alt=""
                              style={{
                                borderRadius: "23PX",
                                width: "356px",
                                height: "450px",
                              }}
                            />
                          </div>
                          <div class="col-7 align-self-center">
                            <ul>
                              <li>
                                Chiều cao <span>{post.height} cm</span>
                              </li>
                              <li>
                                Cân nặng <span>{post.weight} kg</span>
                              </li>
                              <li>
                                Số đo ba vòng <span>{post.measurement} cm</span>
                              </li>
                              <li>
                                Sở thích <span>{post.description}</span>
                              </li>

                              <li>
                                Giới tính <span> {post.gender}</span>
                              </li>
                              <li>
                                Ngày sinh <span>{post.birthday}</span>
                              </li>
                              <li>
                                Dịch vụ cung cấp{" "}
                                {provisions.map((item) => {
                                  return (
                                    <span style={{ paddingLeft: "10px" }}>
                                      {item.provisionName}
                                    </span>
                                  );
                                })}
                              </li>
                            </ul>
                          </div>{" "}
                          <div class="col-1" style={{ paddingTop: "320px" }}>
                            {" "}
                            <Formik
                              initialValues={{
                                content: "",
                              }}
                              onSubmit={(values) => {
                                handleAddComment(values).then(() => {
                                  dispatch(getAllComment());
                                });
                              }}
                            >
                              <>
                                <div>
                                  {" "}
                                  <button
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      backgroundColor: "rgb(31,33,34)",
                                      border: "none",
                                    }}
                                    class="btn btn-primary btn-block logn-btn "
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasScrolling"
                                    aria-controls="offcanvasScrolling"
                                  >
                                    <i class="fa-regular fa-comment-dots fa-flip fa-2xl"></i>
                                  </button>
                                </div>
                                <div
                                  class="offcanvas offcanvas-start"
                                  data-bs-scroll="true"
                                  data-bs-backdrop="false"
                                  tabindex="-1"
                                  id="offcanvasScrolling"
                                  aria-labelledby="offcanvasScrollingLabel"
                                >
                                  <div class="offcanvas-header">
                                    <h3
                                      class="offcanvas-title"
                                      style={{
                                        textAlign: "center",
                                        width: "100%",
                                      }}
                                      id="offcanvasScrollingLabel"
                                    >
                                      Bình luận
                                    </h3>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="offcanvas"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="offcanvas-body">
                                    <p>Để lại bình luận của bạn tại đây </p>

                                    <Form>
                                      <Field
                                        style={{ width: "80%" }}
                                        type="text"
                                        name={"content"}
                                      ></Field>
                                      <button type="submit">Gửi</button>
                                    </Form>
                                    {comment.map((item) => {
                                      return (
                                        <>
                                          <p>
                                            <img
                                              style={{
                                                width: "15px",
                                                height: "15px",
                                              }}
                                              src={item.avatar}
                                            />
                                            {item.username} : {item.content}
                                          </p>
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>{" "}
                              </>
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Formik
              initialValues={{
                startTime: "",
                endTime: "",
              }}
              onSubmit={(values) => {
                console.log(values, 44444555);
                handleRent(values);
              }}
            >
              <Form>
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
                    <div class="modal-dialog modal-lg">
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
                              {" "}
                              <h5 style={{ color: "#e75e8d" }}>
                                Thời gian bắt đầu
                              </h5>
                              <br></br>
                              <Field
                                type="datetime-local"
                                name="startTime"
                                id=""
                                placeholder=""
                                class="form-control"
                              />
                            </div>
                            <div class="form-holder">
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
                            className="btn-close"
                            data-bs-dismiss="modal"
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
              </Form>
            </Formik>
          </div>
        </div>{" "}
      </div>{" "}
    </>
  );
}
