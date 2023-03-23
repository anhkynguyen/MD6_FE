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

export default function Profile() {
  const { idUser } = useParams();
  console.log(idUser, 9999);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.profile);
  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.profile;
    }
  });
  useEffect(() => {
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
                            <button
                              type="submit"
                              class="btn btn-primary btn-block logn-btn"
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
                                        "titleBạn đã đổi trạng thái thành công !",
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
                              Thay đổi trạng thái
                            </button>
                          </div>
                          <br></br>

                          <div class="main-info header-text">
                            <span>{user.status} </span>
                            <h4>{user.username} </h4>
                            {/* <label
                              onClick={dispatch(changeStatus(user.idUser)).then(
                                () => {
                                  navigate("");
                                }
                              )}
                            >
                              {" "}
                              <StatusSwitch />
                            </label> */}

                            <p>
                              Chọn người bạn muốn ghép đôi hoặc trở thành người
                              cung cấp dịch vụ ngay bây giờ
                            </p>
                            <div class="main-border-button">
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
                            </div>
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
                            <li>
                              <Link to={"/user/change-password/" + user.idUser}>
                                <button
                                  type="submit"
                                  class="btn btn-primary btn-block logn-btn"
                                >
                                  Đổi mật khẩu
                                </button>{" "}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="row"></div>
                    </div>
                  </div>
                </div>
                /
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
