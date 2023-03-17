import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile } from "../../service/userService";

export default function ProfileProvider() {
  const id = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

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
