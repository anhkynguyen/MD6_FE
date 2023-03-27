import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  changeStatusOrder,
  getOrderInSeller,
} from "../../service/orderService";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function ListOrderSeller() {
  const { idPost } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => {
    return state.post.posts;
  });
  const users = useSelector((state) => {
    return state.user.users;
  });

  const orderInSeller = useSelector((state) => {
    console.log(state, 444);
    return state.order.orderInSeller;
  });
  useEffect(() => {
    dispatch(getOrderInSeller(idPost)).then(() => {
      getOrderInSeller(idPost);
    });
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
                      <div className="heading-section">
                        <h5
                          style={{
                            textAlign: "center",
                            color: "rgb(236,96,144)",
                          }}
                        >
                          {" "}
                          Duyệt danh sách đơn đặt hàng{" "}
                        </h5>
                        <br />
                      </div>
                      <table class="table table-striped table-dark">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên người CCDV</th>

                            <th scope="col">Bắt đầu</th>
                            <th scope="col">Kết thúc</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Xác nhận</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderInSeller.map((item, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{item.username}</td>
                                  <td>{item.startTime}</td>
                                  <td>{item.endTime}</td>
                                  <td>{item.statusOrder}</td>
                                  <td>{item.total} (vnđ)</td>

                                  <td class="main-border-button">
                                    {
                                      <button
                                        class="btn btn-primary btn-block logn-btn"
                                        style={{ marginTop: "0px" }}
                                        type="submit"
                                        onClick={() => {
                                          swal({
                                            title:
                                              "Bạn có muốn xác nhận đơn thuê không ?",
                                            text: "",
                                            icon: "warning",
                                            buttons: true,
                                            dangerMode: true,
                                          })
                                            .then((willDelete) => {
                                              if (willDelete) {
                                                console.log(item.idOrder, 151);
                                                dispatch(
                                                  changeStatusOrder(
                                                    item.idOrder
                                                  )
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
                                            })
                                            .then(() => {
                                              navigate("/home");
                                            });
                                        }}
                                      >
                                        Xác nhận
                                      </button>
                                    }
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
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
