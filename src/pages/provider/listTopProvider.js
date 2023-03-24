import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getTopProviders} from "../../service/providerService";

export default function ListTopProvider() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const posts = useSelector((state) => {
        if (state.post !== undefined) {
            return state.post.posts;
        }
    });

    const user = useSelector((state) => {
        if (state.user !== undefined) {
            return state.user.currentUser;
        }
    });

    useEffect(() => {
        dispatch(getTopProviders());
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="other-games">
                        <div className="row">
                            <div className="heading-section">
                                <h4>Bảng xếp hạng</h4>
                            </div>
                            {user !== undefined &&
                                posts &&
                                posts.map((item, key) => {
                                    return (
                                        <div className="col-lg-2">
                                            <div class="item">
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    style={{
                                                        width: "46px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                        marginRight: "15px"
                                                    }}
                                                />
                                                <h4>{item.namePost}</h4>
                                                <br/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}