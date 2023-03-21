import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { editProvider, findByIdProvider } from "../../service/providerService";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../upload/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function EditProvider() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const posts = useSelector((state) => {
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
      .then(() => alert("All images uploaded"))
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
                    <div class="inner">
                      <div style={{ backgroundColor: "rgb(31,33,34)" }}>
                        <div className="col-lg-9">
                          <img
                            src={urls}
                            alt={urls}
                            style={{
                              borderRadius: "23px",
                              width: "100%",
                              height: "430px"
                            }}
                          />
                          <input
                            style={{ borderRadius: "15px" }}
                            id="image"
                            name={"image"}
                            type="file"
                            onChange={handleChange}
                          />
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary btn-block logn-btn"
                          onClick={() => dispatch(handleUpload)}
                        >
                          Upload
                        </button>
                      </div>

                      <div
                        class="form-content"
                        style={{ backgroundColor: "rgb(31,33,34)" }}
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
                        <div class="col-12">
                          <button
                            style={{ width: "100%", height: "40px" }}
                            type="submit"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Sửa thông tin người cung cấp dịch vụ
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
