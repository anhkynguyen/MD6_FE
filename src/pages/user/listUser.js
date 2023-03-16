import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUsersRequest,
  getUsers,
  acceptRequestProvider,
} from "../../service/userService";
import swal from "sweetalert";
export default function ListUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    console.log(222, state);
    return state.user.users;
  });

  const usersRequest = useSelector((state) => {
    console.log(44, state.user.usersRequest);
    return state.user.usersRequest;
  });
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUsersRequest());
  }, []);

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <div class="row">
                <div class="col-lg-6">
                  <div class="top-streamers">
                    <div class="heading-section">
                      <h5>
                        <h4 style={{ textAlign: "center" }}>
                          {" "}
                          Duyệt Thành Viên Cung Cấp Dịch Vụ{" "}
                        </h4>
                      </h5>
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
                                  src="/assets/images/avatar-01.jpg"
                                  alt=""
                                  style={{
                                    maxWidth: "46px",
                                    borderRadius: "50%",
                                    marginRight: "15px",
                                  }}
                                />
                                <h6>
                                  <i class="fa fa-check"></i> {item.username}
                                </h6>

                                <button
                                  style={{
                                    borderRadius: "30px",
                                    height: "37px",
                                    width: "79.08px",
                                    float: "right",
                                    backgroundColor: "rgb(231,94,141)",
                                    color: "white",
                                    padding: "8px 20px",
                                    fontSize: "14px",
                                    textAlign: "center",
                                    lineHeight: "100%",
                                    borderColor: "rgb(231,94,141)",
                                  }}
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
                                        ).then(() => {
                                          navigate("/admin/listUser");
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
                                </button>
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
                      <h4>
                        <h4 style={{ textAlign: "center" }}>
                          Duyệt Thành Viên Đăng Ký Tài Khoản
                        </h4>
                      </h4>
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
                                  src="/assets/images/avatar-01.jpg"
                                  alt=""
                                  style={{
                                    maxWidth: "46px",
                                    borderRadius: "50%",
                                    marginRight: "15px",
                                  }}
                                />
                                <h6>
                                  <i class="fa fa-check"></i> {item.username}
                                </h6>
                                <div class="main-button">
                                  <a href="/">Duyệt</a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div class="live-stream">
                <div class="col-lg-12">
                  <div class="heading-section">
                    <h4 style={{ textAlign: "center" }}>Quản Lý Thành Viên</h4>
                  </div>
                </div>

                <div class="row">
                  {users.map((item, key) => {
                    return (
                      <div class="col-lg-3 col-sm-6">
                        <div class="item">
                          <div class="thumb">
                            <img
                              style={{ width: "100%", height: "250px" }}
                              src={item.avatar}
                              alt=""
                            />
                            <div class="hover-effect">
                              <div class="content">
                                <div class="live">
                                  <a href="/">{item.status}</a>
                                </div>
                                <ul>
                                  <li>
                                    <a href="/">
                                      <i class="fa fa-eye"></i> 1.2K
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/">
                                      <i class="fa fa-gamepad"></i> {item.role}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              col-8
                            </div>
                          </div>
                          <div class="down-content">
                            <div class="avatar">
                              <img
                                src="assets/images/avatar-01.jpg"
                                alt=""
                                style={{
                                  maxWidth: "46px",
                                  borderRadius: "50%",
                                  float: "left",
                                }}
                              />
                            </div>
                            <span>
                              <i class="fa fa-check"></i> {item.username}
                            </span>
                            <h4></h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div class="col-lg-12">
                    <div class="main-button">
                      <a href="streams.html">Load More Streams</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
