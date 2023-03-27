import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderInSeller, getOrderInUser } from "../../service/orderService";
import { useNavigate, useParams } from "react-router-dom";

export default function ListOrderUser() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => {
    return state.post.posts;
  });
  const users = useSelector((state) => {
    return state.user.users;
  });

  const orderInUser = useSelector((state) => {
    return state.order.orderInUser;
  });

  useEffect(() => {
    dispatch(getOrderInUser(idUser));
    dispatch(getOrderInSeller(idUser));
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
                          Danh sách đặt đơn hàng{" "}
                        </h5>
                        <br />
                      </div>
                      <table class="table table-striped table-dark">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên người CCDV</th>
                            <th scope="col"></th>
                            <th scope="col">Bắt đầu</th>
                            <th scope="col">Kết thúc</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Tổng tiền</th>
                            {/* <th scope="col">Xác nhận</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {orderInUser.map((item, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{item.username}</td>
                                  <td>
                                    <img
                                      src={item.avatar}
                                      style={{
                                        maxWidth: "45px",
                                        maxHeight: "45px",
                                        borderRadius: "50%",
                                        marginRight: "15px",
                                      }}
                                    ></img>
                                  </td>

                                  <td>{item.startTime}</td>
                                  <td>{item.endTime}</td>
                                  <td>{item.statusOrder}</td>
                                  <td>{item.total}</td>

                                  {/* <td class="main-border-button">
                                    {
                                      <button
                                        style={{
                                          position: "relative",
                                          textAlign: "center",
                                        }}
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
                                              console.log(item.idOrder, 151);
                                              dispatch(
                                                changeStatusOrder(item.idOrder)
                                              ).then(() => {
                                                dispatch(
                                                  getOrderInSeller(idPost)
                                                );
                                              });
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
                                    }
                                  </td> */}
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
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
