import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  countViewPost,
  getProviders,
  searchProviderByGender,
  showSixPostHaveMostViews,
} from "../../service/providerService";

import { useParams } from "react-router-dom";

import { useState } from "react";
import ListTopProvider from "./listTopProvider";
import ListVip from "../admin/listVip";

export default function ListProvider() {
  const [page, setPage] = useSearchParams();
  const page1 = page.get("page") || 1;
  const totalPages = useSelector((state) => {
    if (state.post !== undefined) {
      return state.post.posts.totalPage;
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => {
    if (state.post !== undefined) {
      console.log(state, 5555777);
      return state.post.posts;
    }
  });
  const search = useSelector((state) => {
    return state.post.searchPost;
  });
  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.currentUser;
    }
  });

  useEffect(() => {
    dispatch(getProviders(page1));
    dispatch(showSixPostHaveMostViews());
  }, []);

  return (
    <>
      {" "}
      <ListVip></ListVip>
      <ListTopProvider></ListTopProvider>
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
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
              <div className="heading-section">
                <h4>Thành viên</h4>
              </div>
              <br></br>
            </div>

            <div className="row">
              {search.length > 0 ? (
                <>
                  {search.map((item) => {
                    return (
                      <div className="col-lg-2 col-sm-6">
                        <div className="item">
                          <Link
                            to={"/user/showSellerProfile/" + item.idPost}
                            onClick={() => {
                              dispatch(countViewPost(item.idPost));
                            }}
                          >
                            <img
                              src={item.image}
                              height={200}
                              width={300}
                              alt=""
                            />{" "}
                          </Link>

                          <h4>
                            {item.namePost}
                            <br />
                            <span style={{ color: "white" }}>
                              Giá: {item.price} đ/h
                            </span>{" "}
                            <span style={{ color: "white" }}>
                              Lượt xem: {item.view} lượt
                            </span>{" "}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {" "}
                  {posts.map((item) => {
                    return (
                      <div className="col-lg-2 col-sm-6">
                        <div className="item">
                          <Link
                            to={"/user/showSellerProfile/" + item.idPost}
                            onClick={() => {
                              dispatch(countViewPost(item.idPost));
                            }}
                          >
                            <img
                              src={item.image}
                              height={200}
                              width={300}
                              alt=""
                            />{" "}
                          </Link>
                          <h4>
                            {item.namePost}
                            <br />
                            <span style={{ color: "white" }}>
                              Giá: {item.price} đ/h
                            </span>
                            <span style={{ color: "white" }}>
                              Lượt xem: {item.view} lượt
                            </span>{" "}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              {page1 === 1 ? (
                <>
                  <div className="page-link">
                    <span aria-hidden="true" style={{ color: "black" }}>
                      &laquo;
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="page-link"
                    onClick={() => {
                      dispatch(getProviders(page1 - 1));
                      navigate("/post?page=" + (page1 - 1));
                    }}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </div>
                </>
              )}
            </li>
            <li className="page-item">
              <a className="page-link">
                {page1}/{totalPages}
              </a>
            </li>
            <li className="page-item">
              {page1 === totalPages ? (
                <>
                  <div className="page-link">
                    <span aria-hidden="true" style={{ color: "black" }}>
                      &raquo;
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="page-link"
                    onClick={() => {
                      dispatch(getProviders(Number(page1) + 1));
                      navigate("/post?page=" + (Number(page1) + 1));
                    }}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
