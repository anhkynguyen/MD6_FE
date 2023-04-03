import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getTopProviders,
  showTopMalesFemales,
  showTopTwelve,
} from "../../service/providerService";

export default function ListTopProvider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => {
    if (state.post !== undefined) {
      return state.post.sixPostHaveMostView;
    }
  });
  const top12 = useSelector((state) => {
    if (state.post !== undefined) {
      return state.post.topTwelve;
    }
  });

  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.currentUser;
    }
  });
  const gender = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.currentUser.gender;
    }
  });

  const topMales = useSelector((state) => {
    return state.post.topMalesFemales.male;
  });
  const topFemales = useSelector((state) => {
    return state.post.topMalesFemales.female;
  });

  useEffect(() => {
    dispatch(getTopProviders());
  }, []);
  useEffect(() => {
    dispatch(showTopMalesFemales());
  }, []);
  useEffect(() => {
    dispatch(showTopTwelve());
  }, []);

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <div class="row">
                <div class="col-lg-8">
                  {" "}
                  <div className="other-games">
                    <div className="row">
                      <div className="heading-section">
                        <h4>TOP 4 nam</h4>
                      </div>
                      {topMales !== undefined &&
                        topMales.map((item, key) => {
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
                                    marginRight: "15px",
                                  }}
                                />
                                <h4>{item.namePost}</h4>
                                <br></br>
                                <h4> {item.gender}</h4>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="row">
                      <div className="heading-section">
                        <h4>TOP 8 Nữ</h4>
                      </div>
                      {topFemales !== undefined &&
                        topFemales.map((item, key) => {
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
                                    marginRight: "15px",
                                  }}
                                />
                                <h4>{item.namePost}</h4>
                                <br></br>
                                <h4> {item.gender}</h4>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div class="col-lg-12">
                    {" "}
                    <div className="other-games">
                      <div className="row">
                        <div className="heading-section">
                          <h4>TOP 12 người phù hợp với giới tính</h4>
                        </div>
                        {top12 !== undefined &&
                          top12.map((item, key) => {
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
                                      marginRight: "15px",
                                    }}
                                  />
                                  <h4>{item.namePost}</h4>
                                  <h4>{item.gender}</h4>
                                  <br />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4" style={{ paddingTop: "56px" }}>
                  <div class="top-streamers">
                    <div class="heading-section">
                      <h4>TOP Lượt xem</h4>
                    </div>
                    <ul style={{ margin: "0px" }}>
                      {user !== undefined &&
                        posts &&
                        posts.map((item, key) => {
                          return (
                            <>
                              <li
                                style={{
                                  paddingTop: "0px",
                                  paddingBottom: "11px",
                                }}
                              >
                                <span>{key + 1}</span>
                                <img
                                  src={item.image}
                                  alt=""
                                  style={{
                                    maxWidth: "30px",
                                    borderRadius: "50%",
                                    marginRight: "15px",
                                  }}
                                />
                                <h6>
                                  <i class="fa fa-check"></i> {item.namePost}
                                </h6>
                                <div class="main-button">
                                  <a href="/">{item.view} lượt xem</a>
                                </div>
                              </li>
                            </>
                          );
                        })}
                    </ul>
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
