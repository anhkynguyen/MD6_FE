import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUsersRequest,
  getUsersRegister,
  getUsers,
  acceptRequestProvider,
  acceptUsersRegister,
  lockUser,
} from "../../service/userService";
import swal from "sweetalert";
export default function ListUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return state.user.users;
  });

  const usersRequest = useSelector((state) => {
    return state.user.usersRequest;
  });
  const usersRegister = useSelector((state) => {
    return state.user.usersRegister;
  });
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUsersRequest());
    dispatch(getUsersRegister());
  }, []);

  return (
    <div>
      <div class="container">
        <div>
          <div class="starsec"></div>
          <div class="starthird"></div>
          <div class="starfourth"></div>
          <div class="starfifth"></div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <div class="row">
                <div class="col-lg-6">
                  <div class="top-streamers">
                    <div class="heading-section">
                      <h5
                        style={{
                          textAlign: "center",
                          color: "rgb(236,96,144)",
                        }}
                      >
                        {" "}
                        Duyệt Thành Viên Cung Cấp Dịch Vụ{" "}
                      </h5>
                      <br />
                    </div>
                    {usersRequest !== undefined &&
                      usersRequest.map((item, key) => {
                        return (
                          <div>
                            {" "}
                            <ul>
                              <li>
                                <span>{key + 1}</span>
                                <img
                                  src={item.avatar}
                                  alt=""
                                  style={{
                                    maxWidth: "45px",
                                    maxHeight: "45px",

                                    borderRadius: "50%",
                                    marginRight: "15px",
                                  }}
                                />
                                <h6>
                                  <i class="fa fa-check"></i> {item.username}
                                </h6>{" "}
                                <button
                                  style={{
                                    float: "right",
                                    position: "relative",
                                    bottom: "30px",
                                  }}
                                  type="submit"
                                  class="btn btn-primary btn-block logn-btn"
                                  onClick={() => {
                                    swal({
                                      title:
                                        "Bạn có muốn trở thành người cung cấp dịch vụ không ?",
                                      text: "",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        dispatch(
                                          acceptRequestProvider(item.idUser)
                                        )
                                          .then(() => {
                                            console.log(19);
                                            navigate("/home");
                                          })
                                          .then(() => {
                                            console.log(20);
                                            navigate("/home");
                                          });

                                        swal(
                                          "Bạn đã gửi yêu cầu thành công !",
                                          {
                                            icon: "Thành công ",
                                          }
                                        );
                                      } else {
                                        swal("Bạn đã hủy yêu cầu !");
                                      }
                                    });
                                  }}
                                >
                                  Duyệt
                                </button>{" "}
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="top-streamers">
                    <div class="heading-section">
                      <h5
                        style={{
                          textAlign: "center",
                          color: "rgb(236,96,144)",
                        }}
                      >
                        {" "}
                        Duyệt Thành Viên Đăng Ký Tài Khoản{" "}
                      </h5>
                      <br />
                    </div>
                    {usersRegister !== undefined &&
                      usersRegister.map((item, key) => {
                        return (
                          <div>
                            {" "}
                            <ul>
                              <li>
                                <span>{key + 1}</span>
                                <img
                                  src={item.avatar}
                                  alt=""
                                  style={{
                                    maxWidth: "45px",
                                    maxHeight: "45px",

                                    borderRadius: "50%",
                                    marginRight: "15px",
                                  }}
                                />
                                <h6>
                                  <i class="fa fa-check"></i> {item.username}
                                </h6>{" "}
                                <button
                                  style={{
                                    float: "right",
                                    position: "relative",
                                    bottom: "30px",
                                  }}
                                  type="submit"
                                  class="btn btn-primary btn-block logn-btn"
                                  onClick={() => {
                                    swal({
                                      title:
                                        "Bạn có muốn trở thành người cung cấp dịch vụ không ?",
                                      text: "",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        dispatch(
                                          acceptUsersRegister(item.idUser)
                                        )
                                          .then(() => {
                                            navigate("/home");
                                          })
                                          .then(() => {
                                            navigate("/home");
                                          });

                                        swal(
                                          "Bạn đã gửi yêu cầu thành công !",
                                          {
                                            icon: "Thành công ",
                                          }
                                        );
                                      } else {
                                        swal("Bạn đã hủy yêu cầu !");
                                      }
                                    });
                                  }}
                                >
                                  Duyệt
                                </button>{" "}
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="other-games">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4>Quản lý thành viên</h4>
                </div>
              </div>
              {users.map((item, key) => {
                return (
                  <div class="col-lg-6">
                    <div class="item">
                      <img src={item.avatar} alt="" class="templatemo-item" />
                      <h4>{item.username}</h4>
                      <span>{item.role}</span>
                      <h4>{item.status}</h4>

                      <ul>
                        <button
                          style={{
                            float: "right",
                            position: "relative",
                            bottom: "30px",
                          }}
                          type="submit"
                          class="btn btn-primary btn-block logn-btn"
                          onClick={() => {
                            swal({
                              title: "Bạn có muốn mở khóa thành viên  không ?",
                              text: "",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                dispatch(lockUser(item.idUser))
                                  .then(() => {
                                    navigate("/home");
                                  })
                                  .then(() => {
                                    navigate("/home");
                                  });

                                swal("Bạn đã mở khóa thành công !", {
                                  icon: "Success ",
                                });
                              } else {
                                swal("Bạn đã hủy yêu cầu !");
                              }
                            });
                          }}
                        >
                          Mở khóa
                        </button>{" "}
                        <button
                          style={{
                            float: "right",
                            position: "relative",
                            bottom: "30px",
                          }}
                          type="submit"
                          class="btn btn-primary btn-block logn-btn"
                          onClick={() => {
                            swal({
                              title: "Bạn có khóa thành viên không ?",
                              text: "",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                dispatch(lockUser(item.idUser))
                                  .then(() => {
                                    navigate("/home");
                                  })
                                  .then(() => {
                                    navigate("/home");
                                  });

                                swal("Bạn đã khóa thành công !", {
                                  icon: "Success ",
                                });
                              } else {
                                swal("Bạn đã hủy yêu cầu !");
                              }
                            });
                          }}
                        >
                          Khoá
                        </button>{" "}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
