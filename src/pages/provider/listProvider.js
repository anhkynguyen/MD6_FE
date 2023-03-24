import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getProviders, removeProvider } from "../../service/providerService";
import swal from "sweetalert";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { editProvider, findByIdProvider } from "../../service/providerService";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../upload/firebaseConfig";

import { useState } from "react";

export default function ListProvider() {
  const { id } = useParams();
  console.log(id);

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const posts1 = useSelector((state) => {
    if (state.post.posts[0] !== undefined) {
      return state.post.posts[0];
    } else {
      return {
        namePost: "",
        description: "",
        image: "",
        price: "",
        height: "",
        weight: "",
        measurement: "",
      };
    }
  });

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    if (images.length > 0) {
      images.map((image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURLs) => {
                setUrls(downloadURLs);
                console.log("File available at", downloadURLs);
              }
            );
          }
        );
      });
    }
    Promise.all(promises)
      .then(() => swal("Ảnh đã được tải lên thành công !"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(findByIdProvider(id)).then((value) => {
      setUrls([value.payload[0].image]);
    });
  }, []);

  const handleEdit = (values) => {
    let data = [{ ...values, image: urls }, id];
    console.log(data, 44);

    data[0] = {
      idPost: data[0].idPost,
      namePost: data[0].namePost,
      image: data[0].image,
      description: data[0].description,
      price: data[0].price,
      height: data[0].height,
      weight: data[0].weight,
      measurement: data[0].measurement,
      date: data[0].date,
    };
    console.log(urls);
    dispatch(editProvider(data)).then((values) => {
      swal("Edit Success !!!");
      navigate("/home");
    });
  };

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
      return state.post.posts;
    }
  });

  const user = useSelector((state) => {
    if (state.user !== undefined) {
      console.log(state);
      return state.user.currentUser;
    }
  });

  useEffect(() => {
    dispatch(getProviders(page1));
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
                        <Link to={"/user/showSellerProfile/" + item.idPost}>
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
                              <Link to={`/home/edit-post/${item.idPost}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>
                            </li>
                            <li>
                              <div
                                class="modal fade"
                                id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabindex="-1"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-xl">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5
                                        class="modal-title"
                                        id="staticBackdropLabel"
                                      >
                                        Modal title
                                      </h5>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      <>
                                        <Formik
                                          initialValues={posts1}
                                          onSubmit={(values) => {
                                            values.image = urls[1];

                                            handleEdit(values);
                                          }}
                                          enableReinitialize={true}
                                        >
                                          <Form>
                                            <div class="container">
                                              <div>
                                                <div class="starsec"></div>
                                                <div class="starthird"></div>
                                                <div class="starfourth"></div>
                                                <div class="starfifth"></div>
                                              </div>
                                              <div class="row">
                                                <div class="col-12">
                                                  <div class="page-content">
                                                    <div class="main-profile">
                                                      <div class="inner">
                                                        <div
                                                          style={{
                                                            backgroundColor:
                                                              "rgb(31,33,34)",
                                                          }}
                                                        >
                                                          <div className="col-lg-9">
                                                            <img
                                                              src={urls}
                                                              alt={urls}
                                                              style={{
                                                                borderRadius:
                                                                  "23px",
                                                                width: "100%",
                                                                height: "430px",
                                                              }}
                                                            />
                                                            <input
                                                              style={{
                                                                borderRadius:
                                                                  "15px",
                                                              }}
                                                              id="image"
                                                              name={"image"}
                                                              type="file"
                                                              onChange={
                                                                handleChange
                                                              }
                                                            />
                                                          </div>
                                                          <button
                                                            type="button"
                                                            class="btn btn-primary btn-block logn-btn"
                                                            onClick={() =>
                                                              dispatch(
                                                                handleUpload
                                                              )
                                                            }
                                                          >
                                                            Upload
                                                          </button>
                                                        </div>

                                                        <div
                                                          class="form-content"
                                                          style={{
                                                            backgroundColor:
                                                              "rgb(31,33,34)",
                                                          }}
                                                        >
                                                          <div class="form-header">
                                                            <h2>
                                                              Cập nhật thông tin
                                                            </h2>
                                                            <br></br>
                                                            <br></br>
                                                          </div>
                                                          <div class="form-row">
                                                            <div class="form-holder">
                                                              <h5
                                                                style={{
                                                                  color:
                                                                    "#e75e8d",
                                                                }}
                                                              >
                                                                Tên bài đăng
                                                              </h5>
                                                              <br></br>
                                                              <Field
                                                                type="text"
                                                                name={
                                                                  "namePost"
                                                                }
                                                                id="namePost"
                                                                placeholder="Tên bài đăng"
                                                                class="form-control"
                                                                style={{
                                                                  backgroundColor:
                                                                    "rgb(22,22,36)",
                                                                  color:
                                                                    "white",
                                                                }}
                                                              />
                                                            </div>
                                                            <div class="form-holder">
                                                              <h5
                                                                style={{
                                                                  color:
                                                                    "#e75e8d",
                                                                }}
                                                              >
                                                                Chiều cao
                                                              </h5>
                                                              <br></br>
                                                              <Field
                                                                type="text"
                                                                name={"height"}
                                                                id="height"
                                                                placeholder="Chiều cao"
                                                                class="form-control"
                                                                style={{
                                                                  backgroundColor:
                                                                    "rgb(28,31,47)",
                                                                  color:
                                                                    "white",
                                                                }}
                                                              />
                                                            </div>
                                                          </div>
                                                          <div class="form-row">
                                                            <div class="form-holder">
                                                              <h5
                                                                style={{
                                                                  color:
                                                                    "#e75e8d",
                                                                }}
                                                              >
                                                                Cân nặng
                                                              </h5>
                                                              <br></br>
                                                              <Field
                                                                type="text"
                                                                name={"weight"}
                                                                id="weight"
                                                                placeholder="Cân nặng"
                                                                class="form-control"
                                                                style={{
                                                                  backgroundColor:
                                                                    "rgb(28,31,47)",
                                                                  color:
                                                                    "white",
                                                                }}
                                                              />
                                                            </div>
                                                            <div class="form-holder">
                                                              <h5
                                                                style={{
                                                                  color:
                                                                    "#e75e8d",
                                                                }}
                                                              >
                                                                Số đo ba vòng
                                                              </h5>
                                                              <br></br>
                                                              <Field
                                                                name="measurement"
                                                                type="text"
                                                                placeholder="Số đo ba vòng"
                                                                class="form-control"
                                                                style={{
                                                                  backgroundColor:
                                                                    "rgb(28,31,47)",
                                                                  color:
                                                                    "white",
                                                                }}
                                                              />
                                                            </div>
                                                          </div>
                                                          <div class="form-row">
                                                            <div class="form-holder">
                                                              <h5
                                                                style={{
                                                                  color:
                                                                    "#e75e8d",
                                                                }}
                                                              >
                                                                Giá thuê
                                                              </h5>
                                                              <br></br>
                                                              <Field
                                                                name={"price"}
                                                                id="price"
                                                                type="text"
                                                                placeholder="Giá thuê"
                                                                class="form-control"
                                                                style={{
                                                                  backgroundColor:
                                                                    "rgb(28,31,47)",
                                                                  color:
                                                                    "white",
                                                                }}
                                                              />
                                                            </div>
                                                            <div class="form-holder">
                                                              <h5
                                                                style={{
                                                                  color:
                                                                    "#e75e8d",
                                                                }}
                                                              >
                                                                Sở thích
                                                              </h5>
                                                              <br></br>
                                                              <Field
                                                                name={
                                                                  "description"
                                                                }
                                                                id="description"
                                                                type="text"
                                                                placeholder="Age"
                                                                class="form-control"
                                                                style={{
                                                                  backgroundColor:
                                                                    "rgb(28,31,47)",
                                                                  color:
                                                                    "white",
                                                                }}
                                                              />
                                                            </div>
                                                          </div>
                                                          <div class="col-12">
                                                            <button
                                                              style={{
                                                                width: "100%",
                                                                height: "40px",
                                                              }}
                                                              type="submit"
                                                              class="btn btn-primary btn-block logn-btn"
                                                            >
                                                              Sửa thông tin
                                                              người cung cấp
                                                              dịch vụ
                                                            </button>{" "}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </Form>
                                        </Formik>
                                      </>
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                      >
                                        Understood
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        ) : (
                          <div>
                            {/* <>
                              <button
                                type="button"
                                class="btn btn-primary btn-block logn-btn"
                                style={{ width: "100%" }}
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                              >
                                Thuê
                              </button>

                              <div
                                class="modal fade"
                                id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabindex="-1"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5
                                        class="modal-title"
                                        id="staticBackdropLabel"
                                      >
                                        {" "}
                                      </h5>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      {" "}
                                      <div class="form-row">
                                        <div class="form-holder">
                                          <h5 style={{ color: "#e75e8d" }}>
                                            Chọn dịch vụ
                                          </h5>
                                          <br></br>
                                          <input
                                            type="text"
                                            name={"namePost"}
                                            id="namePost"
                                            placeholder="Tên bài đăng"
                                            class="form-control"
                                          />
                                        </div>
                                        <div class="form-holder">
                                          <h5 style={{ color: "#e75e8d" }}>
                                            Thời gian bắt đầu
                                          </h5>
                                          <br></br>
                                          <input
                                            type="date"
                                            name={""}
                                            id=""
                                            placeholder=""
                                            class="form-control"
                                          />
                                          <br></br>
                                          <h5 style={{ color: "#e75e8d" }}>
                                            Thời gian kết thúc
                                          </h5>
                                          <br></br>
                                          <input
                                            type="date"
                                            name={""}
                                            id=""
                                            placeholder=""
                                            class="form-control"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        style={{ width: "48%" }}
                                        class="btn btn-primary btn-block logn-btn"
                                        data-bs-dismiss="modal"
                                      >
                                        Hủy
                                      </button>
                                      <button
                                        type="button"
                                        style={{ width: "48%" }}
                                        class="btn btn-primary btn-block logn-btn"
                                      >
                                        Thuê
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </> */}
                          </div>
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
