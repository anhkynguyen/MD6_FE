import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../service/userService";
export default function ListUser() {
  const dispatch = useDispatch();

  const users = useSelector((state) => {
    console.log(555555555, state.user.users);
    return state.user.users[0];
  });
  console.log(6666666666, users);

  useEffect(() => {
    console.log(12222);
    dispatch(getUsers());
  }, []);
  return (
    <>
      {console.log(999999999999999, users)}
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <div class="row">
                <div class="col-lg-12">
                  <div class="top-streamers">
                    <div class="heading-section">
                      <h4>
                        <h4 style={{ textAlign: "center" }}>
                          Thành viên chờ xét duyệt
                        </h4>
                      </h4>
                    </div>
                    {users.map((item, key) => {
                      return (
                        <div>
                          {" "}
                          <ul>
                            <li>
                              <span>{key}</span>
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
                  <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <div class="thumb">
                        <img src="/assets/images/stream-05.jpg" alt="" />
                        <div class="hover-effect">
                          <div class="content">
                            <div class="live">
                              <a href="/">Live</a>
                            </div>
                            <ul>
                              <li>
                                <a href="/">
                                  <i class="fa fa-eye"></i> 1.2K
                                </a>
                              </li>
                              <li>
                                <a href="/">
                                  <i class="fa fa-gamepad"></i> CS-GO
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
                          <i class="fa fa-check"></i> Kengan Omeg
                        </span>
                        <h4>Just Talking With Fans</h4>
                      </div>
                    </div>
                  </div>

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
    </>
  );
}
