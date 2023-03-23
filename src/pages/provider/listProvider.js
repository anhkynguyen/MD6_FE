import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProviders, removeProvider } from "../../service/providerService";
import swal from "sweetalert";

export default function ListProvider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => {
    console.log(1111,state)

      return state.post.posts;

  });

  const user = useSelector((state) => {
    if (state.user !== undefined) {
      console.log(state)
      return state.user.currentUser;
    }
  });

  useEffect(() => {
    dispatch(getProviders());
  }, []);

  return (
    <>
      <div class="most-popular" style={{backgroundColor :''}}>
        <div>
          <div class="starsec"></div>
          <div class="starthird"></div>
          <div class="starfourth"></div>
          <div class="starfifth"></div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="heading-section">
              <br></br>
              <br></br>
              <br></br>
              <div class="col-lg-12">
                <div class="main-button"></div>
              </div>
              <br></br>
            </div>

            <div className="row">
              {user !== undefined &&
                posts &&
                posts.map((item) => {
                  return (
                    <div className="col-lg-2 col-sm-6">
                      <div className="item">
                        <Link to={"/user/showSellerProfile/" + item.idPost}>
                          <img
                            src={item.image}
                            height={200}
                            width={300}
                            alt=""
                          />{" "}
                        </Link>
                        <h4>
                          {item.namePost}

                          <br />
                          <span style={{ color: "white" }}>
                            Số đo: {item.measurement}
                          </span>
                        </h4>
                        {user.idUser === item.idUser ? (
                          <ul>
                            <li>
                              <a>
                                <i
                                  className="fa-solid fa-trash"
                                  onClick={() => {
                                    swal({
                                      title: "Are you sure?",
                                      text: "!!!",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        dispatch(
                                          removeProvider(item.idPost)
                                        ).then(() => {
                                          dispatch(getProviders()).then(() => {
                                            navigate("/home");
                                          });
                                        });
                                        swal("Xoa thanh cong!", {
                                          icon: "success",
                                        });
                                      } else {
                                        swal("Khong xoa thanh cong!");
                                        dispatch(getProviders()).then(() => {
                                          navigate("/home");
                                        });
                                      }
                                    });
                                  }}
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a href={`/home/edit-post/${item.idPost}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </li>
                          </ul>
                        ) : (
                          <div>
                            {/* <>
                              <button
                                type="button"
                                class="btn btn-primary btn-block logn-btn"
                                style={{ width: "100%" }}
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
                                      <h5
                                        class="modal-title"
                                        id="staticBackdropLabel"
                                      >
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
                                          <input
                                            type="text"
                                            name={"namePost"}
                                            id="namePost"
                                            placeholder="Tên bài đăng"
                                            class="form-control"
                                          />
                                        </div>
                                        <div class="form-holder">
                                          <h5 style={{ color: "#e75e8d" }}>
                                            Thời gian bắt đầu
                                          </h5>
                                          <br></br>
                                          <input
                                            type="date"
                                            name={""}
                                            id=""
                                            placeholder=""
                                            class="form-control"
                                          />
                                          <br></br>
                                          <h5 style={{ color: "#e75e8d" }}>
                                            Thời gian kết thúc
                                          </h5>
                                          <br></br>
                                          <input
                                            type="date"
                                            name={""}
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
                                        type="button"
                                        style={{ width: "48%" }}
                                        class="btn btn-primary btn-block logn-btn"
                                      >
                                        Thuê
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </> */}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
