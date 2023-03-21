import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getProviders, getTopProviders, removeProvider} from "../../service/providerService";
import swal from "sweetalert";

export default function Top() {
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

                    <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="card-wrapper">
                                    {user !== undefined && posts && posts.map((item)=>{
                                        return(
                                    <div className="card" >
                                        <div className="image-wrapper">
                                            <img src={item.image} alt="..."/>
                                        </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.namePost}</h5>
                                                <span>{item.measurement}</span><span>{item.price}</span>
                                            </div>
                                    </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>



        </>
    )
}