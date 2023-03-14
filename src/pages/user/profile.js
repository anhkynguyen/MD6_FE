import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile } from "../../service/userService";
export default function Profile() {
  const id = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const user1 = useSelector((state) => state.user.profile);
  console.log(1, user1);

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
                          <span>{user1.status}</span>
                          <h4>{user.username}</h4>
                          <p>
                            You Haven't Gone Live yet. Go Live By Touching The
                            Button Below.
                          </p>
                          <div class="main-border-button">
                            <a href="/">Trở thành người cung cấp dịch vụ</a>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Giới tính <span> {user1.gender}</span>
                          </li>
                          <li>
                            Ngày sinh <span>{user1.birthday}</span>
                          </li>
                          <li>
                            Email <span>{user1.gmail}</span>
                          </li>
                          <li>
                            Chức vụ <span>{user1.role}</span>
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
