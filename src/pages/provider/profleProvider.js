import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile, changeStatus } from "../../service/userService";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { findByIdProvider } from "../../service/providerService";
import * as Yup from "yup";
import { getProvision } from "../../service/provisionService";
import { userAskVip } from "../../service/userService";

const validateSchema = Yup.object().shape({
  namePost: Yup.string().required("Vui lòng không để trống !"),
  description: Yup.string().required("Vui lòng không để trống !"),
  price: Yup.string()
    .required("Vui lòng không để trống !")
    .max(2000000, "Giá phải nhỏ hơn 2 triệu")
    .min(1000, "Giá phải lớn hơn 1000 đồng"),
  height: Yup.string()
    .required("Vui lòng không để trống !")
    .max(200, "Vui lòng nhập lại chiều cao"),

  weight: Yup.string()
    .required("Vui lòng không để trống !")
    .max(200, "Vui lòng nhập lại cân nặng"),
  measurement: Yup.string().required("Vui lòng không để trống !"),
});

export default function ProfileProvider() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    console.log(state, 223);
    if (state.user !== undefined) {
      return state.user.profile;
    }
  });
  const idUser1 = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.profile.idUser;
    }
  });
  const post = useSelector((state) => {
    return state.post.posts;
  });
  console.log(post.length, 5555);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProfile(idUser));
    dispatch(findByIdProvider(idUser1));
  }, []);
  useEffect(() => {
    dispatch(getProvision());
  }, []);

  return (
    <>
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
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
                                    title: "Bạn đã đổi trạng thái thành công !",
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
                          <h4>{user.username}</h4>
                          <br /> <p> Người cung cấp dịch vụ</p>
                          <div className="main-border-button">
                            <button
                              style={{
                                marginTop: "50px",
                                marginRight: "90px",
                              }}
                              type="submit"
                              className="btn btn-primary btn-block logn-btn"
                              onClick={() => {
                                swal({
                                  title: "Bạn có muốn trở thành VIP không ?",
                                  text: "",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                }).then((willDelete) => {
                                  if (willDelete) {
                                    dispatch(userAskVip(user.idUser)).then(
                                      () => {
                                        dispatch(getProfile(idUser)).then(
                                          () => {
                                            // navigate("/home");
                                          }
                                        );
                                      }
                                    );
                                    swal("Bạn đã gửi yêu cầu thành công !", {
                                      icon: "success",
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
                              Bạn muốn trở thành VIP
                            </button>{" "}
                            <br></br>
                          </div>{" "}
                          {post.length === 0 ? (
                            <div className="main-border-button">
                              <a
                                style={{
                                  float: "left",
                                  width: "200px",
                                  height: "40px",
                                  textAlign: "center",
                                  paddingBottom: "10px",
                                  color: "white",
                                  backgroundColor: "rgb(28,31,47)",
                                }}
                                href="/home/add-post"
                              >
                                Đăng Bài
                              </a>
                            </div>
                          ) : (
                            <></>
                          )}
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
                            style={{ float: "right", width: "100%" }}
                            type="submit"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Đổi mật khẩu
                          </button>{" "}
                        </Link>
                        <Link to={"/home/edit-post/" + user.idUser}>
                          <button
                            style={{ float: "right", width: "100%" }}
                            type="submit"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Cập nhật thông tin bài đăng
                          </button>{" "}
                        </Link>
                      </div>
                    </div>
                    <div class="row"></div>
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
