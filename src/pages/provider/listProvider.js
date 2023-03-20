import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProviders, removeProvider } from "../../service/providerService";
import swal from "sweetalert";

export default function ListProvider() {
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
    dispatch(getProviders());
  }, []);

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
              {user !== undefined &&
                posts &&
                posts.map((item) => {
                  return (
                    <div className="col-lg-2 col-sm-6">
                      <div className="item">
                        <img src={item.image} height={200} width={300} alt="" />
                        <h4>
                          <Link to={"/home/showSellerProfile/" + item.idPost}>
                            {item.namePost}
                          </Link>
                          <br />
                          <span style={{ color: "white" }}>
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
                                          dispatch(getProviders()).then(() => {
                                            navigate("/home");
                                          });
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
                          <></>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
