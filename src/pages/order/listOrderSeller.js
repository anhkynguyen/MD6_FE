import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {changeStatusOrder, getOrderInSeller} from "../../service/orderService";
import {useNavigate, useParams} from "react-router-dom";
import swal from "sweetalert";

export default function ListOrderSeller() {
    const {idPost} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector((state) => {
        return state.post.posts
    })
    const users = useSelector((state) => {
        return state.user.users;
    });


    const orderInSeller = useSelector((state) => {
        return state.order.orderInSeller;
    });
    console.log(orderInSeller,54)


    console.log(idPost,1211)
    useEffect(() => {
        dispatch(getOrderInSeller(idPost))
    }, [])
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
                                                    Duyệt đơn thuê{" "}
                                                </h5>
                                                <br/>
                                            </div>
                                            <table border={1} style={{width: "100%"}}>
                                                <tr style={{textAlign: "center"}}>
                                                    <td style={{border : "1px", width: "30px"}}>STT</td>
                                                    <td style={{border : "1px", width: "30px"}}>Ảnh</td>
                                                    <td style={{border : "1px", width: "30px"}}>Tên bài</td>
                                                    <td style={{border : "1px", width: "30px"}}>Thời gian bắt đầu</td>
                                                    <td style={{border : "1px", width: "30px"}}>Thời gian kết thúc</td>
                                                    <td style={{border : "1px", width: "30px"}}>Dịch vụ</td>
                                                    <td style={{border : "1px", width: "30px"}}>Trạng thái</td>
                                                    <td style={{border : "1px", width: "30px"}}>Tổng tiền</td>
                                                    <td style={{border : "1px", width: "30px"}}>Xác nhận</td>
                                                </tr>

                                                {orderInSeller !== undefined &&
                                                    orderInSeller.map((item, key) => {
                                                        return (
                                                            <tr style={{textAlign: "center"}}>
                                                                <td>{key + 1}</td>
                                                                <td><img
                                                                    src={item.avatar}
                                                                    alt=""
                                                                    style={{
                                                                        maxWidth: "45px",
                                                                        maxHeight: "45px",

                                                                        borderRadius: "50%",
                                                                        marginRight: "15px",
                                                                    }}
                                                                /></td>
                                                                <td>{item.username}</td>
                                                                <td>{item.startTime}</td>
                                                                <td>{item.endTime} </td>
                                                                <td>{item.provisionName}</td>
                                                                <td>{item.statusOrder}</td>
                                                                <td>{item.total}</td>
                                                                <td class="main-border-button">{
                                                                    <button
                                                                        style={{
                                                                            position: "relative",
                                                                            bottom: "20px",
                                                                            textAlign: "center"

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
                                                                                    console.log(item.idOrder, 151)
                                                                                    dispatch(changeStatusOrder(item.idOrder))
                                                                                ;
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
                                                                }</td>
                                                            </tr>


                                                        );
                                                    })}

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
    )
}

