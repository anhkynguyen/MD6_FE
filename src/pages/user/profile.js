import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  changeStatus,
  getProfile,
  requestProvider,
} from "../../service/userService";
import swal from "sweetalert";
import ProfileProvider from "../provider/profleProvider";
import { Link } from "react-router-dom";
import { findByIdProvider } from "../../service/providerService";

export default function Profile() {
  const { idUser } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.profile);
  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.profile;
    }
  });
  const idUser1 = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.profile.idUser;
    }
  });
  useEffect(() => {
    dispatch(findByIdProvider(idUser1));
    dispatch(getProfile(idUser));
  }, []);
  return (
    <>
      {" "}
      {user.ask !== "Yes" || user.role !== "seller" ? (
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
                  <div class="col-lg-12">
                    <div class="main-profile ">
                      <div class="row">
                        <div class="col-lg-4">
                          <img
                            src={user.avatar}
                            alt=""
                            style={{
                              borderRadius: "23PX",
                              width: "356px",
                              height: "340px",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 align-self-center">
                          <div class="main-border-button">
                            <h4>Trạng thái</h4>
                            <button
                              type="submit"
                              class="btn btn "
                              onClick={() => {
                                swal({
                                  title:
                                    "Bạn có muốn thay đổi trạng thái không ?",
                                  text: "",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                }).then((willDelete) => {
                                  if (willDelete) {
                                    dispatch(changeStatus(user.idUser)).then(
                                      () => {
                                        dispatch(getProfile(idUser));
                                      }
                                    );
                                    swal({
                                      title:
                                        "Bạn đã đổi trạng thái thành công !",
                                      icon: "success",
                                    });
                                  } else {
                                    swal({
                                      title:
                                        "Bạn đã hủy thao tác thay đổi trạng thái !",
                                      icon: "error",
                                    });
                                  }
                                });
                              }}
                            >
                              <i
                                class="fa-solid fa-arrows-rotate fa-spin fa-2xl"
                                style={{ color: "#2dd730" }}
                              ></i>
                            </button>
                            <h3
                              style={{
                                color: "yellow",
                                borderRadius: "15px",
                                height: "40px",
                                border: "black",
                              }}
                            >
                              {user.status}{" "}
                            </h3>
                          </div>
                          <br></br>

                          <div class="main-info header-text">
                            <h4>{user.username} </h4>

                            <p>
                              Chọn người bạn muốn ghép đôi hoặc trở thành người
                              cung cấp dịch vụ ngay bây giờ
                            </p>
                            <div class="main-border-button">
                              {user.role === "Vip" ? (
                                <h3 style={{ color: "yellow" }}>VIP</h3>
                              ) : (
                                <button
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
                                          requestProvider(user.idUser)
                                        ).then(() => {
                                          dispatch(getProfile(idUser)).then(
                                            () => {
                                              // navigate("/home");
                                            }
                                          );
                                        });
                                        swal({
                                          icon: "success",
                                          title:
                                            "Bạn đã gửi yêu cầu thành công !",
                                        });
                                      } else {
                                        swal({
                                          title: "Bạn đã hủy yêu cầu !",
                                          icon: "error",
                                        });
                                      }
                                    });
                                  }}
                                >
                                  Trở thành nhà cung cấp dịch vụ
                                </button>
                              )}
                            </div>
                            <div></div>
                          </div>
                        </div>

                        <div class="col-lg-4 align-self-center">
                          <ul>
                            <li>
                              Giới tính <span> {user.gender}</span>
                            </li>
                            <li>
                              Ngày sinh <span>{user.birthday}</span>
                            </li>
                            <li>
                              Email <span>{user.gmail}</span>
                            </li>
                            <li>
                              Chức vụ <span>{user.role}</span>
                            </li>
                          </ul>
                          <Link to={"/user/change-password/" + user.idUser}>
                            <button
                              style={{ float: "right", width: "100%" }}
                              type="submit"
                              class="btn btn-primary btn-block logn-btn"
                            >
                              Đổi mật khẩu
                            </button>{" "}
                          </Link>
                          {user.role === "seller" || user.role === "Vip" ? (
                            <Link to={"/home/edit-post/" + user.idUser}>
                              <button
                                style={{ float: "right", width: "100%" }}
                                type="submit"
                                class="btn btn-primary btn-block logn-btn"
                              >
                                Cập nhật thông tin bài đăng
                              </button>{" "}
                            </Link>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfileProvider></ProfileProvider>
      )}
    </>
  );
}
