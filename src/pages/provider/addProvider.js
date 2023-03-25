import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../upload/firebaseConfig";
import { addProvider } from "../../service/providerService";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
const validateSchema = Yup.object().shape({
  namePost: Yup.string().required("Vui lòng không để trống !"),
  description: Yup.string().required("Vui lòng không để trống !"),
  price: Yup.string().required("Vui lòng không để trống !"),
  height: Yup.string().required("Vui lòng không để trống !"),
  weight: Yup.string().required("Vui lòng không để trống !"),
  measurement: Yup.string().required("Vui lòng không để trống !"),
});

export default function AddProvider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const user1 = useSelector((state) => {
    return state.user.currentUser;
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
                setUrls((prevState) => [...prevState, downloadURLs]);
                console.log("File available at", downloadURLs);
              }
            );
          }
        );
      });
    }
    Promise.all(promises)
      .then(() => swal({ title: "Tải ảnh lên thành công !", icon: "success" }))
      .catch((err) => console.log(err));
  };

  const handleAdd = (values) => {
    let data = { ...values, user: user1.idUser };
    dispatch(addProvider(data)).then(() => {
      navigate("/home");
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          namePost: "",
          description: "",
          image: "",
          price: "",
          height: "",
          weight: "",
          measurement: "",
        }}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          values.image = urls[0];
          values.idUser = user1.idUser;
          handleAdd(values);
        }}
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
                          src={urls[0]}
                          alt={urls[0]}
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
                        />{" "}
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
                          <h2>Đăng thông tin</h2>
                          <br></br>
                          <br></br>
                        </div>
                        <div class="form-row">
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Tên bài đăng</h5>
                            <br></br>
                            <alert
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"namePost"}></ErrorMessage>
                            </alert>{" "}
                            <Field
                              style={{
                                backgroundColor: "rgb(22,22,36)",
                                color: "white",
                              }}
                              type="text"
                              name={"namePost"}
                              id="namePost"
                              placeholder="Tên bài đăng"
                              class="form-control"
                            />
                          </div>
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Chiều cao</h5>
                            <br></br>
                            <alert
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"height"}></ErrorMessage>
                            </alert>{" "}
                            <Field
                              style={{
                                backgroundColor: "rgb(22,22,36)",
                                color: "white",
                              }}
                              type="number"
                              name={"height"}
                              id="height"
                              placeholder="Chiều cao của bạn (cm)"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Cân nặng</h5>
                            <alert
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"weight"}></ErrorMessage>
                            </alert>{" "}
                            <br></br>
                            <Field
                              style={{
                                backgroundColor: "rgb(22,22,36)",
                                color: "white",
                              }}
                              type="number"
                              name={"weight"}
                              id="weight"
                              placeholder="Cân nặng của bạn (kg)"
                              class="form-control"
                            />
                          </div>
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Số đo ba vòng</h5>
                            <alert
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"measurement"}></ErrorMessage>
                            </alert>{" "}
                            <br></br>
                            <Field
                              style={{
                                backgroundColor: "rgb(22,22,36)",
                                color: "white",
                              }}
                              name="measurement"
                              type="text"
                              placeholder="Số đo ba vòng của bạn (cm)"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Giá thuê</h5>
                            <alert
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"price"}></ErrorMessage>
                            </alert>{" "}
                            <br></br>
                            <Field
                              style={{
                                backgroundColor: "rgb(22,22,36)",
                                color: "white",
                              }}
                              name={"price"}
                              id="price"
                              type="number"
                              placeholder="Giá thuê theo giờ"
                              class="form-control"
                            />
                          </div>
                          <div class="form-holder">
                            <h5 style={{ color: "#e75e8d" }}>Sở thích</h5>
                            <alert
                              className="text-danger"
                              style={{ float: "left" }}
                            >
                              <ErrorMessage name={"description"}></ErrorMessage>
                            </alert>{" "}
                            <br></br>
                            <Field
                              style={{
                                backgroundColor: "rgb(22,22,36)",
                                color: "white",
                              }}
                              name={"description"}
                              id="description"
                              type="text"
                              placeholder="Sở thích của bạn"
                              class="form-control"
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
                            Đăng thông tin người cung cấp dịch vụ
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
  );
}
