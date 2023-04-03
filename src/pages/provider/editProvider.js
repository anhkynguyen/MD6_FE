import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { editProvider, findByIdProvider } from "../../service/providerService";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../upload/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { getProvision } from "../../service/provisionService";
import { addPersonal } from "../../service/personalService";

export default function EditProvider() {
  const [checked, setChecked] = useState([]);
  const { id } = useParams();
  const idPost = useSelector((state) => {
    return state.post.posts[0].idPost;
  });
  let a = { checked, idPost };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const provisions = useSelector((state) => {
    return state.provision.provisions;
  });
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  const posts = useSelector((state) => {
    if (state.post.posts !== undefined) {
      console.log(state);
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
  const handleAddPersonal = (value) => {
    let data1 = { idProvision: a.checked, idPost: idPost };

    dispatch(addPersonal(data1));
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
      .then(() =>
        swal({ title: "Ảnh đã được tải lên thành công !", icon: "success" })
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dispatch(getProvision());
  }, []);

  useEffect(() => {
    dispatch(findByIdProvider(id)).then((value) => {
      setUrls([value.payload[0].image]);
    });
  }, []);

  const handleEdit = (values) => {
    let data = [{ ...values, image: urls }, id];
    console.log(data, 777);
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

    dispatch(editProvider(data)).then((values) => {
      swal({ title: "Sửa thông tin thành công", icon: "success" });
      navigate("/home");
    });
  };

  return (
    <>
      <Formik
        initialValues={posts}
        onSubmit={(values) => {
          values.image = urls[1];
          //   values.idUser = user.idUser;
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
                    <div
                      class="inner"
                      style={{
                        backgroundColor: "rgb(31,33,34)",
                        width: "100%",
                      }}
                    >
                      <div className="col-lg-4" style={{ textAlign: "center" }}>
                        <img
                          src={urls}
                          alt={urls}
                          style={{
                            borderRadius: "23px",
                            width: "100%",
                            height: "490px",
                          }}
                        />
                        <input
                          style={{ borderRadius: "15px" }}
                          id="image"
                          name={"image"}
                          type="file"
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          style={{
                            backgroundColor: "rgb(28,31,47)",
                            width: "50%",
                          }}
                          class="btn btn-primary btn-block logn-btn"
                          onClick={() => dispatch(handleUpload)}
                        >
                          Tải ảnh lên
                        </button>
                      </div>

                      <div
                        class="form-content"
                        style={{
                          backgroundColor: "rgb(31,33,34)",
                          paddingTop: "0px",
                          paddingLeft: "25px",
                          paddingRight: "25px",
                        }}
                      >
                        <div class="form-header">
                          <h2>Cập nhật thông tin</h2>
                          <br></br>
                          <br></br>
                        </div>
                        <div class="form-row">
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Tên bài đăng</h5>
                            <br></br>
                            <Field
                              type="text"
                              name={"namePost"}
                              id="namePost"
                              placeholder="Tên bài đăng"
                              class="form-control"
                              style={{
                                backgroundColor: "rgb(22,22,36)",
                                color: "white",
                              }}
                            />
                          </div>
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Chiều cao</h5>
                            <br></br>
                            <Field
                              type="text"
                              name={"height"}
                              id="height"
                              placeholder="Chiều cao"
                              class="form-control"
                              style={{
                                backgroundColor: "rgb(28,31,47)",
                                color: "white",
                              }}
                            />
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Cân nặng</h5>
                            <br></br>
                            <Field
                              type="text"
                              name={"weight"}
                              id="weight"
                              placeholder="Cân nặng"
                              class="form-control"
                              style={{
                                backgroundColor: "rgb(28,31,47)",
                                color: "white",
                              }}
                            />
                          </div>
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Số đo ba vòng</h5>
                            <br></br>
                            <Field
                              name="measurement"
                              type="text"
                              placeholder="Số đo ba vòng"
                              class="form-control"
                              style={{
                                backgroundColor: "rgb(28,31,47)",
                                color: "white",
                              }}
                            />
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Giá thuê</h5>
                            <br></br>
                            <Field
                              name={"price"}
                              id="price"
                              type="text"
                              placeholder="Giá thuê"
                              class="form-control"
                              style={{
                                backgroundColor: "rgb(28,31,47)",
                                color: "white",
                              }}
                            />
                          </div>
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Sở thích</h5>
                            <br></br>
                            <Field
                              name={"description"}
                              id="description"
                              type="text"
                              placeholder="Age"
                              class="form-control"
                              style={{
                                backgroundColor: "rgb(28,31,47)",
                                color: "white",
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-12" style={{ textAlign: "center" }}>
                          <button
                            style={{
                              width: "50%",
                              height: "50px",
                            }}
                            type="submit"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Sửa thông tin người cung cấp dịch vụ
                          </button>{" "}
                          <button
                            style={{
                              width: "50%",
                              height: "50px",
                            }}
                            type="button"
                            class="btn btn-primary btn-block logn-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            Thêm thể loại dịch vụ thuê
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
                                  <h3
                                    style={{ width: "100%" }}
                                    class="modal-title"
                                    id="staticBackdropLabel"
                                  >
                                    Chọn dịch vụ
                                  </h3>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  {" "}
                                  {provisions.map((item) => {
                                    return (
                                      <label>
                                        <input
                                          type="checkbox"
                                          id="idProvision"
                                          name="idProvision"
                                          value={item.idProvision}
                                          onChange={handleCheck}
                                        />
                                        <label
                                          style={{
                                            paddingRight: "20px",
                                            fontSize: "large",
                                            color: "black",
                                          }}
                                        >
                                          {" "}
                                          {item.provisionName}
                                        </label>
                                      </label>
                                    );
                                  })}
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    style={{
                                      width: "48%",
                                      height: "50px",
                                    }}
                                    class="btn btn-primary btn-block logn-btn"
                                    data-bs-dismiss="modal"
                                  >
                                    Hủy
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleAddPersonal().then(() => {
                                        swal({
                                          title: "Thêm thành công",
                                          icon: "success",
                                        });
                                      });
                                    }}
                                    style={{
                                      width: "48%",
                                      height: "50px",
                                    }}
                                    type="submit"
                                    class="btn btn-primary btn-block logn-btn"
                                    className="btn-close"
                                  >
                                    Thêm
                                  </button>
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
        </Form>
      </Formik>
    </>
  );
}
