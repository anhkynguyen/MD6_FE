import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getProviders, removeProvider} from "../../service/providerService";
import swal from "sweetalert";
import ListTopProvider from "./listTopProvider";
import ListVip from "../admin/listVip";

export default function ListProvider() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useSearchParams()
    const page1 = page.get('page') || 1;
    const totalPages = useSelector(state => {
        if (state.post !== undefined) {
            return state.post.posts.totalPage;
        }
    })

    const posts = useSelector((state) => {
        if (state.post !== undefined) {
            return state.post.posts.posts;
        }
    });
    console.log(posts)

    const user = useSelector((state) => {
        if (state.user !== undefined) {
            return state.user.currentUser;
        }
    });

    useEffect(() => {
        dispatch(getProviders(page1));
    }, []);

    return (
        <>
            <br/>
            <br/>
            <br/>
            <ListTopProvider/>
            <br/>
            <ListVip/>
            <div className="most-popular">
                <div>
                    <div className="starsec"></div>
                    <div className="starthird"></div>
                    <div className="starfourth"></div>
                    <div className="starfifth"></div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-section">
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className="col-lg-12">
                                <div className="main-button"></div>
                            </div>
                        </div>
                        <div className="row">
                            {user !== undefined &&
                                posts !== undefined &&
                                posts.map((item) => {
                                    return (
                                        <div className="col-lg-2 col-sm-6">

                                            <div className="item">
                                                <Link to={"/user/showSellerProfile/" + item.idPost}>
                                                    <img
                                                        src={item.image}
                                                        height={200}
                                                        width={300}
                                                        alt=""
                                                    />
                                                </Link>
                                                <h4>
                                                    {item.namePost}

                                                    <br/>
                                                    <span style={{color: "white"}}>Số đo: {item.measurement}</span>
                                                </h4>
                                                {user.idUser === item.idUser ? (
                                                    <ul>
                                                        <li>
                                                            <a href={`/order/showOrderInSeller/${item.idPost}`}>
                                                                <i className="fa-solid fa-cart-shopping"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href={`/home/edit-post/${item.idPost}`}>
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </a>
                                                        </li>
                                                    </ul>


                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );

                                })}
                        </div>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                {(page1 === 1) ?
                                    <>
                                        <div className="page-link"><span aria-hidden="true"
                                                                         style={{color: 'black'}}>&laquo;</span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="page-link" onClick={() => {
                                            console.log(page1, 131)
                                            if ((page1 - 1) > 0) {
                                                dispatch(getProviders(page1 - 1));
                                                navigate('/home?page=' + (page1 - 1))
                                            }

                                        }
                                        }><span aria-hidden="true">&laquo;</span>
                                        </div>
                                    </>
                                }
                            </li>
                            <li className="page-item">
                                <a className="page-link">{page1}/{totalPages}</a>
                            </li>
                            <li className="page-item">
                                {(page1 === totalPages) ?
                                    <>
                                        <div className="page-link"><span aria-hidden="true"
                                                                         style={{color: 'black'}}>&raquo;</span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="page-link" onClick={() => {
                                            if ((Number((page1)) + 1) <= totalPages) {
                                                dispatch(getProviders(Number(page1) + 1));
                                                navigate('/home?page=' + (Number(page1) + 1))
                                            }

                                        }
                                        }><span aria-hidden="true">&raquo;</span>
                                        </div>
                                    </>
                                }
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
            <br/>
            <br/>
        </>
    );
}
