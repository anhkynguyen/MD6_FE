import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getProviders, removeProvider} from "../../service/providerService";
import swal from "sweetalert";
import ListTopProvider from "./listTopProvider";

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
            return state.post.posts;
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
            <ListTopProvider/>

            <div class="most-popular">
                <div>
                    <div class="starsec"></div>
                    <div class="starthird"></div>
                    <div class="starfourth"></div>
                    <div class="starfifth"></div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="heading-section">
                            <br></br>
                            <br></br>
                            <br></br>
                            <div class="col-lg-12">
                                <div class="main-button"></div>
                            </div>
                        </div>
                        <div className="row">
                            {user !== undefined &&
                                posts &&
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
                                                    <span style={{color: "white"}}>
                              Số đo: {item.measurement}
                            </span>
                                                </h4>
                                                {user.idUser === item.idUser ? (
                                                    <ul>
                                                        <li>
                                                            <a>
                                                                <i
                                                                    className="fa-solid fa-trash"
                                                                    onClick={() => {
                                                                        swal({
                                                                            title: "Are you sure?",
                                                                            text: "!!!",
                                                                            icon: "warning",
                                                                            buttons: true,
                                                                            dangerMode: true,
                                                                        }).then((willDelete) => {
                                                                            if (willDelete) {
                                                                                dispatch(
                                                                                    removeProvider(item.idPost)
                                                                                ).then(() => {
                                                                                    dispatch(getProviders()).then(
                                                                                        () => {
                                                                                            navigate("/home");
                                                                                        }
                                                                                    );
                                                                                });
                                                                                swal("Xoa thanh cong!", {
                                                                                    icon: "success",
                                                                                });
                                                                            } else {
                                                                                swal("Khong xoa thanh cong!");
                                                                                dispatch(getProviders()).then(() => {
                                                                                    navigate("/home");
                                                                                });
                                                                            }
                                                                        });
                                                                    }}
                                                                ></i>
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
                                        dispatch(getProviders(page1 - 1));
                                        navigate('/post?page=' + (page1 - 1))
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
                                        dispatch(getProviders(Number(page1) + 1));
                                        navigate('/post?page=' + (Number(page1) + 1))
                                    }
                                    }><span aria-hidden="true">&raquo;</span>
                                    </div>
                                </>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
            <br/>
        </>
    );
}
