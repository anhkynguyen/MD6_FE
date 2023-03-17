import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {findByIdProvider} from "../../service/providerService";

export default function ProfilePost() {
    const id = useParams();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const post = useSelector((state) => state.post.posts)

    useEffect(() => {
        dispatch(findByIdProvider(id));
    }, []);
    return (
        <>

            <div class="container">
                <div>
                    <div class="starsec"></div>
                    <div class="starthird"></div>
                    <div class="starfourth"></div>
                    <div class="starfifth"></div>
                </div>
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
                                                <ul>
                                                    <li>
                                                        Giới tính <span> {post.height}</span>
                                                    </li>
                                                    <li>
                                                        Ngày sinh <span>{post.weight}</span>
                                                    </li>
                                                    <li>
                                                        Email <span>{post.measurement}</span>
                                                    </li>
                                                    <li>
                                                        Chức vụ <span>{post.price}</span>
                                                    </li>
                                                </ul>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
