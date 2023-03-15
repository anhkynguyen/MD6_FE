import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile } from "../../service/userService";
export default function Profile() {
  const id = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  console.log(1, user);

  useEffect(() => {
    dispatch(getProfile(id));
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
                          style={{ borderRadius: "23PX" }}
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
                            <a href="/">Trở thành người cung cấp dịch vụ</a>
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
    </>
  );
}
