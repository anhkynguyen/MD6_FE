import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile, requestProvider } from "../../service/userService";
import swal from "sweetalert";
import ProfileProvider from "../provider/profleProvider";
export default function Profile() {
  const id = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(33333, user);

  useEffect(() => {
    dispatch(getProfile(id));
  }, []);
  return (
    <>
      {" "}
      {user.ask !== "Yes" || user.role !== "seller" ? (
        <div class="container">
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
                          <div class="main-info header-text">
                            <span>{user.status}</span>

                            <h4>{user.username}</h4>
                            <p>
                              Chọn người bạn muốn ghép đôi hoặc trở thành người
                              cung cấp dịch vụ ngay bây giờ
                            </p>
                            <div class="main-border-button">
                              <strong
                                style={{
                                  borderRadius: "30px",
                                  height: "50px",
                                  width: "300px",
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
                                        requestProvider(user.idUser)
                                      ).then(() => {
                                        dispatch(getProfile()).then(() => {
                                          // navigate("/home");
                                        });
                                      });
                                      swal("Bạn đã gửi yêu cầu thành công !", {
                                        icon: "Thành công ",
                                      });
                                    } else {
                                      swal("Bạn đã hủy yêu cầu !");
                                    }
                                  });
                                }}
                              >
                                <a style={{ color: "white" }}>
                                  Trở thành người cung cấp dịch vụ
                                </a>
                              </strong>
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
