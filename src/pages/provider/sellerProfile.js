import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getSellerProfile} from "../../service/userService";

export default function SellerProfile() {
    const id = useParams();
    console.log(id,44)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const post = useSelector((state) =>{
        return state.post.posts
    } )
    console.log(post,11)

    useEffect(() => {
        dispatch(getSellerProfile(id.idUser));
    }, []);
    return (
        <>
            <div className="most-popular">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-section">
                            <div>
                                <div class="starsec"></div>
                                <div class="starthird"></div>
                                <div class="starfourth"></div>
                                <div class="starfifth"></div>
                            </div>

                                            <div class="col-lg-12">
                                                <div class="page-content">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="main-profile ">
                                                                <div class="row">
                                                                <div class="row">
                                                                    <div class="col-lg-4">
                                                                        <img
                                                                            src={post.image}
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
                                                                                Chiều cao <span>{post.height} cm</span>
                                                                            </li>
                                                                            <li>
                                                                                Cân nặng <span>{post.weight} kg</span>
                                                                            </li>
                                                                            <li>
                                                                                Số đo ba
                                                                                vòng <span>{post.measurement} cm</span>
                                                                            </li>
                                                                            <li>
                                                                                Giá thuê <span>{post.price} VND</span>
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


                                                            </div>
                                                        </div>
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
