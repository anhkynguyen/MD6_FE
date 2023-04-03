import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderAdmin } from "../../service/orderService";

export default function ListOrderAdmin() {
  const dispatch = useDispatch();

  const order = useSelector((state) => {
    return state.order.orders;
  });

  useEffect(() => {
    dispatch(getOrderAdmin());
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
                          Danh sách đơn hàng{" "}
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
                          </tr>
                        </thead>
                        <tbody>
                          {order.map((item, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{item.username}</td>
                                  <td>
                                    <img
                                      src={item.image}
                                      alt=""
                                      style={{
                                        maxWidth: "45px",
                                        maxHeight: "45px",

                                        borderRadius: "50%",
                                        marginRight: "15px",
                                      }}
                                    />
                                  </td>
                                  <td>{item.startTime}</td>
                                  <td>{item.endTime}</td>
                                  <td>{item.statusOrder}</td>
                                  <td>{item.total} (vnđ)</td>
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
