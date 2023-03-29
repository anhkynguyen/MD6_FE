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
  getAddVip,
  changeSellerToVip,
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
  const vip = useSelector((state) => {
    console.log(state.user.vips, 45);
    return state.user.vips;
  });
  const usersRegister = useSelector((state) => {
    return state.user.usersRegister;
  });

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUsersRequest());
    dispatch(getUsersRegister());
    dispatch(getAddVip());
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
                <div class="col-lg-4">
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
                                        "Bạn có muốn duyệt thành viên này không ?",
                                      text: "",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        dispatch(
                                          acceptRequestProvider(item.idUser)
                                        ).then(() => {
                                          dispatch(getUsersRequest());
                                        });

                                        swal({
                                          title: "Bạn đã duyệt thành công !",
                                          icon: "success",
                                        });
                                      } else {
                                        swal({
                                          title: "Bạn đã hủy thao tác duyệt !",
                                          icon: "error",
                                        });
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
                <div class="col-lg-4">
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
                                    maxWidth: "40px",
                                    maxHeight: "40px",
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
                                        "Bạn có muốn duyệt thành viên này không ?",
                                      text: "",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        dispatch(
                                          acceptUsersRegister(item.idUser)
                                        ).then(() => {
                                          dispatch(getUsersRegister());
                                        });

                                        swal({
                                          title: "Bạn đã duyệt thành công !",
                                          icon: "success",
                                        });
                                      } else {
                                        swal({
                                          title: "Bạn đã hủy thao tác duyệt !",
                                          icon: "error",
                                        });
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
                <div class="col-lg-4">
                  <div class="top-streamers">
                    <div class="heading-section">
                      <h5
                        style={{
                          textAlign: "center",
                          color: "rgb(236,96,144)",
                        }}
                      >
                        {" "}
                        Duyệt Thành Viên Đăng Ký Vip{" "}
                      </h5>
                      <br />
                    </div>
                    {vip !== undefined &&
                      vip.map((item, key) => {
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
                                    borderRadius: "15px",
                                    bottom: "30px",
                                  }}
                                  type="submit"
                                  class="btn btn-primary btn-block logn-btn"
                                  onClick={() => {
                                    swal({
                                      title:
                                        "Bạn có muốn duyệt thành viên này không ?",
                                      text: "",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        dispatch(
                                          changeSellerToVip(item.idUser)
                                        );
                                        navigate("/home");

                                        swal({
                                          title: "Bạn đã duyệt thành công !",
                                          icon: "success",
                                        });
                                      } else {
                                        swal({
                                          title: "Bạn đã hủy thao tác duyệt !",
                                          icon: "error",
                                        });
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
                      <img
                        src={item.avatar}
                        alt=""
                        class="templatemo-item"
                        style={{ width: "80px", height: "80px" }}
                      />
                      <p
                        style={{
                          fontSize: "20px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {item.username} <br></br>
                        <h3 style={{ fontSize: "15px", color: "green" }}>
                          {item.role}
                        </h3>
                      </p>

                      <ul>
                        {/* <li>
                          <label class="switch">
                            <input
                              type="checkbox"
                              value={"off"}
                              onClick={() => {
                                dispatch(lockUser(item.idUser));
                                console.log(111111, item.idUser);
                              }}
                            />
                            <span class="slider round"></span>
                          </label>
                        </li> */}
                        <button
                          style={{
                            float: "right",

                            bottom: "30px",
                          }}
                          type="submit"
                          class="btn"
                          onClick={() => {
                            swal({
                              title:
                                "Bạn có thay đổi trạng thái thành viên  không ?",
                              text: "",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                dispatch(lockUser(item.idUser))
                                  .then(() => {
                                    dispatch(getUsers());
                                    dispatch(getUsersRequest());
                                    dispatch(getUsersRegister());
                                  })
                                  .then(() => {
                                    // navigate("/home");
                                  });

                                swal({
                                  title:
                                    "Bạn đã thay đổi trạng thái thành viên thành công !",
                                  icon: "success",
                                });
                              } else {
                                swal({
                                  title: "Bạn đã hủy thao tác thay đổi !",
                                  icon: "error",
                                });
                              }
                            });
                          }}
                        >
                          <i
                            class="fa-solid fa-power-off fa-fade fa-2xl"
                            style={{ color: " #ed390c" }}
                          ></i>
                        </button>{" "}
                        <h3
                          style={{
                            color: "yellow",
                            float: "right",
                            fontSize: "15px",
                            height: "40px",
                            textAlign: "center",
                            paddingTop: "10px",
                          }}
                        >
                          {item.status}
                        </h3>
                        {/* <button
                          style={{
                            float: "right",
                            position: "relative",
                            bottom: "30px",
                          }}
                          type="submit"
                          class="btn btn-primary btn-block logn-btn"
                          onClick={() => {
                            swal({
                              title: "Bạn có khóa thành viên này không ?",
                              text: "",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                dispatch(lockUser(item.idUser))
                                  .then(() => {
                                    dispatch(getUsers());
                                    dispatch(getUsersRequest());
                                    dispatch(getUsersRegister());
                                  })
                                  .then(() => {
                                    navigate("");
                                  });

                                swal({
                                  title: "Bạn đã khóa thành công !",
                                  icon: "success",
                                });
                              } else {
                                swal({
                                  title: "Bạn đã hủy thao tác mở khóa !",
                                  icon: "error",
                                });
                              }
                            });
                          }}
                        >
                          Khoá
                        </button>{" "} */}
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
