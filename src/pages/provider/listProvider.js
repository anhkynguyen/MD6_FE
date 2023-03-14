import {useDispatch, useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getProviders} from "../../service/providerService";

export default function ListProvider() {
    const dispatch = useDispatch();
    // const navigate = useNavigate()


    const posts = useSelector(state => {
        if (state.post !== undefined) {
            return state.post.posts;
        }
    })


    const user = useSelector(state => {
        console.log(state.user.currentUser,111)
        if (state.user !== undefined) {
            return state.user.currentUser;
        }
    })

    useEffect(() => {
        dispatch(getProviders())
    }, [])

    return (
        <>


                        <div class="most-popular">

                            <div class="row">

                                <div class="col-lg-12">
                                    <div class="heading-section">
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <div class="col-lg-12">
                                            <div class="main-button"></div>
                                        </div>
                                        <br></br>
                                    </div>

                                    <div className="row">
                                        {user !== undefined && posts && posts.map((item) => {
                                                return (
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="item">
                                                <img src={item.image} height={200} width={300} alt=""/>
                                                <h4>
                                                    {item.namePost}
                                                    <br/>
                                                    <span style={{color: "white"}}>Giá: {item.price}/h</span>
                                                </h4>
                                                <ul>
                                                    <li>
                                                        <i className="fa-regular fa-circle-check"></i>
                                                    </li>
                                                </ul>
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

