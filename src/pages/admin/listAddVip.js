import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeSellerToVip, getAddVip } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function ListAddVip() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => {
    return state.post.posts;
  });
  const vip = useSelector((state) => {
    console.log(state, 45);
    return state.user.vips;
  });

  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.currentUser;
    }
  });
  useEffect(() => {
    dispatch(getAddVip());
  }, []);
  return (
    <>
      <div>
        <div className="container">
          <div>
            <div className="starsec"></div>
            <div className="starthird"></div>
            <div className="starfourth"></div>
            <div className="starfifth"></div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="page-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="top-streamers">
                      <div className="heading-section" style={{ with: "100%" }}>
                        <h5
                          style={{
                            textAlign: "center",
                            color: "rgb(236,96,144)",
                          }}
                        >
                          {" "}
                          Danh sách duyệt Vip{" "}
                        </h5>
                        <br />
                      </div>
                      <table border={1} style={{ width: "100%" }}>
                        <tr style={{ textAlign: "center" }}>
                          <td style={{ border: "1px", width: "30px" }}>STT</td>
                          <td style={{ border: "1px", width: "30px" }}>Ảnh</td>
                          <td style={{ border: "1px", width: "30px" }}>
                            Tên người đăng
                          </td>
                          <td style={{ border: "1px", width: "30px" }}>
                            Giới tính
                          </td>
                          <td style={{ border: "1px", width: "30px" }}>
                            Ngày tháng năm sinh
                          </td>
                          <td style={{ border: "1px", width: "30px" }}>
                            Trạng thái
                          </td>
                          <td style={{ border: "1px", width: "30px" }}>
                            Duyệt
                          </td>
                        </tr>

                        {vip !== undefined &&
                          vip.map((item, key) => {
                            return (
                              <tr style={{ textAlign: "center" }}>
                                <td>{key + 1}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    alt=""
                                    style={{
                                      maxWidth: "45px",
                                      maxHeight: "45px",

                                      borderRadius: "50%",
                                      marginRight: "15px",
                                    }}
                                  />
                                </td>
                                <td>{item.username}</td>
                                <td>{item.gender} </td>
                                <td>{item.birthday}</td>
                                <td>{item.role}</td>
                                <td className="main-border-button">
                                  {item.role !== "Vip" ? (
                                    <button
                                      style={{
                                        bottom: "20px",
                                        textAlign: "center",
                                      }}
                                      className="btn btn-outline-danger"
                                      type="submit"
                                      onClick={() => {
                                        swal({
                                          title:
                                            "Bạn có muốn xác nhận dịch vụ không ?",
                                          text: "",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                        }).then((willDelete) => {
                                          if (willDelete) {
                                            console.log(item.idUser, 151);
                                            dispatch(
                                              changeSellerToVip(item.idUser)
                                            );
                                            navigate("/home");
                                            swal(
                                              "Bạn xác nhận yêu cầu thành công !",
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
                                      Xác nhận
                                    </button>
                                  ) : (
                                    <>Đã hoàn thành</>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </table>
                    </div>
                    <br />
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
