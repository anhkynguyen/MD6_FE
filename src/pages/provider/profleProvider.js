import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile, changeStatus } from "../../service/userService";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function ProfileProvider() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
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
                                      dispatch(getProfile(idUser)).then(() => {
                                        // navigate("/home");
                                      });
                                    }
                                  );
                                  swal("Bạn đã đổi trạng thái thành công !", {
                                    icon: "success",
                                  });
                                } else {
                                  swal("Bạn đã hủy yêu cầu !");
                                }
                              });
                            }}
                          >
                            Thay đổi trạng thái
                          </button>
                        </div>
                        <br></br>
                        <div class="main-info header-text">
                          <span>{user.status}</span>
                          <h4>{user.username}</h4>
                          <p>Người cung cấp dịch vụ</p>
                          <div class="main-border-button"></div>
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
                            type="submit"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Đổi mật khẩu
                          </button>{" "}
                        </Link>
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
    </>
  );
}
