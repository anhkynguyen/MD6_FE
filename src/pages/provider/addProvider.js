import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { addProvider } from "../../service/providerService";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../upload/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function AddProvider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  console.log(2, urls);
  console.log(3, setUrls);
  const user = useSelector((state) => {
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
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const handleAdd = (values) => {
    let data = { ...values, user: user.idUser };
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
        onSubmit={(values) => {
          console.log(11, values);
          values.image = urls[0];
          values.idUser = user.idUser;
          handleAdd(values);
        }}
      >
        <Form>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="page-content">
                  <div class="col-lg-12">
                    <div class="main-profile ">
                      <div class="row">
                        <h1 style={{ textAlign: "center" }}>
                          Đăng thông tin của bạn
                        </h1>
                        <div className="col-lg-4">
                          <div
                            className="col-md-4 wow fadeInUp"
                            data-wow-delay="0.1s"
                          >
                            <img
                              className="position-relative rounded w-300 h-300"
                              src={urls[0]}
                              alt={urls[0]}
                              style={{
                                borderRadius: "23px",
                                height: "300px",
                                width: "300px",
                              }}
                            />
                          </div>

                          <br></br>
                          <Field
                            name={"image"}
                            id="image"
                            style={{
                              width: "100%",
                              height: "40px",
                              borderRadius: "15px",
                              backgroundColor: "#1F2122",
                              color: "white",
                              borderColor: "white",
                            }}
                            type="file"
                            onChange={handleChange}
                          ></Field>
                          <button
                            type="button"
                            className="btn btn-secondary w-100 py-3"
                            onClick={() => dispatch(handleUpload)}
                          >
                            Upload
                          </button>
                        </div>
                        <div className="col-lg-3 align-self-center">
                          <div className="main-info header-text">
                            <h5 style={{ color: "white" }}>Tên </h5>
                            <Field
                              type="text"
                              name={"namePost"}
                              id="namePost"
                              placeholder="Hãy nhập tên bạn muốn...."
                              style={{
                                width: "100%",
                                height: "40px",
                                borderRadius: "15px",
                                backgroundColor: "#1F2122",
                                color: "white",
                                borderColor: "white",
                              }}
                            ></Field>

                            <hr></hr>
                            <h5 style={{ color: "white" }}>Sở thích</h5>
                            <Field
                              type="text"
                              name={"description"}
                              id="description"
                              placeholder="Hãy nhập sở thích của bạn...."
                              style={{
                                width: "100%",
                                height: "40px",
                                borderRadius: "15px",
                                backgroundColor: "#1F2122",
                                color: "white",
                                borderColor: "white",
                              }}
                            ></Field>
                            <hr></hr>
                            <h5 style={{ color: "white" }}>Giá</h5>
                            <Field
                              style={{
                                width: "100%",
                                height: "40px",
                                borderRadius: "15px",
                                backgroundColor: "#1F2122",
                                color: "white",
                                borderColor: "white",
                              }}
                              type="number"
                              name={"price"}
                              id="price"
                              placeholder="Hãy nhập giá của bạn...."
                            ></Field>

                            <div className="main-border-button border-no-active "></div>
                          </div>
                        </div>
                        <div className="col-lg-3 align-self-center">
                          <div className="main-info header-text">
                            <h5 style={{ color: "white" }}>Chiều cao</h5>

                            <Field
                              name={"height"}
                              id="height"
                              type="number"
                              placeholder="Hãy nhập chiều cao của bạn...."
                              style={{
                                width: "100%",
                                height: "40px",
                                borderRadius: "15px",
                                backgroundColor: "#1F2122",
                                color: "white",
                                borderColor: "white",
                              }}
                            ></Field>
                            <hr></hr>
                            <h5 style={{ color: "white" }}>Cân nặng</h5>

                            <Field
                              name={"weight"}
                              id="weight"
                              style={{
                                width: "100%",
                                height: "40px",
                                borderRadius: "15px",
                                backgroundColor: "#1F2122",
                                color: "white",
                                borderColor: "white",
                              }}
                              type="number"
                              placeholder="Hãy nhập cân nặng của bạn...."
                            ></Field>
                            <hr></hr>
                            <h5 style={{ color: "white" }}>Số đo 3 vòng</h5>
                            <Field
                              name={"measurement"}
                              id="measurement"
                              style={{
                                width: "100%",
                                height: "40px",
                                borderRadius: "15px",
                                backgroundColor: "#1F2122",
                                color: "white",
                                borderColor: "white",
                              }}
                              type="text"
                            ></Field>

                            <div className="main-border-button border-no-active "></div>
                          </div>
                        </div>
                        <div className="col-lg-2 align-self-center">
                          <div className="main-info header-text">
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>
                            <hr></hr>

                            <button
                              type="submit"
                              style={{
                                width: "70%",
                                height: "40px",
                                borderRadius: "15px",
                                backgroundColor: "#1F2122",
                                color: "white",
                                borderColor: "white",
                              }}
                            >
                              Đăng bài
                            </button>
                            <hr></hr>
                            <hr></hr>

                            <hr></hr>
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
