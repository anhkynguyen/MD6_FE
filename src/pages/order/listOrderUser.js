import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getOrderInSeller, getOrderInUser} from "../../service/orderService";
import {useNavigate, useParams} from "react-router-dom";

export default function ListOrderUser() {
    const {idUser} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector((state) => {
        return state.post.posts
    })
    const users = useSelector((state) => {
        return state.user.users;
    });

    const orderInUser = useSelector((state) => {
        return state.order.orderInUser;
    });



    useEffect(() => {
        dispatch(getOrderInUser(idUser));
        dispatch(getOrderInSeller(idUser))
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
                                            <div className="heading-section" style={{with: "100%"}}>
                                                <h5
                                                    style={{
                                                        textAlign: "center",
                                                        color: "rgb(236,96,144)",
                                                    }}
                                                >
                                                    {" "}
                                                    Danh sách đơn hàng{" "}
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
                                                    <td style={{border : "1px", width: "30px"}}>Trạng thái</td>
                                                    <td style={{border : "1px", width: "30px"}}>Tổng tiền</td>
                                                </tr>

                                            {orderInUser !== undefined &&
                                                orderInUser.map((item, key) => {
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
                                                                <td>{item.statusOrder}</td>
                                                                <td>{item.total}</td>
                                                            </tr>


                                                    );
                                                })}

                                            </table>
                                        </div>
                                        <br/>
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

