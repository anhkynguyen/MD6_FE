import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";
import { storage } from "../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { register } from "../../service/userService";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
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
              }
            );
          }
        );
      });
    }
    Promise.all(promises)
      .then(() => swal("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const handleRegister = (values) => {
    let data = { ...values, avatar: urls[0] };
    console.log(2, data);
    dispatch(register(data)).then((value) => {
      if (value.payload === "Username already registered") {
        swal("Username already registered");
        navigate("/register");
      } else {
        swal("Register successfully");
        navigate("/");
      }
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          gmail: "",
          birthday: "",
          gender: "",
          avatar: "",
        }}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        <Form>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="page-content">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="main-profile ">
                        <div class="row">
                          <h1 style={{ textAlign: "center" }}>Đăng Ký</h1>

                          <div class="col-lg-4">
                            <div
                              class="col-md-4 wow fadeInUp"
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
                              name={"avatar"}
                              id="avatar"
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

                          <div class="col-lg-3 align-self-center">
                            <div class="main-info header-text">
                              <h5 style={{ color: "white" }}>Họ Tên </h5>

                              <Field
                                type="text"
                                placeholder="Hãy nhập họ tên của bạn...."
                                name={"username"}
                                id="username"
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
                              <h5 style={{ color: "white" }}>Mật khẩu</h5>

                              <Field
                                type="password"
                                name={"password"}
                                id="password"
                                placeholder="Hãy nhập mật khẩu của bạn...."
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
                              <h5 style={{ color: "white" }}>
                                Nhập lại mật khẩu
                              </h5>

                              <Field
                                style={{
                                  width: "100%",
                                  height: "40px",
                                  borderRadius: "15px",
                                  backgroundColor: "#1F2122",
                                  color: "white",
                                  borderColor: "white",
                                }}
                                type="password"
                                name={"re-password"}
                                id="re-password"
                                placeholder="Hãy nhập lại mật khẩu của bạn...."
                              ></Field>
                              <hr></hr>
                              <hr></hr>

                              <div class="main-border-button border-no-active "></div>
                            </div>
                          </div>

                          <div class="col-lg-3 align-self-center">
                            <div class="main-info header-text">
                              <h5 style={{ color: "white" }}>Email</h5>

                              <Field
                                name={"gmail"}
                                id="gmail"
                                type="email"
                                placeholder="Hãy nhập email của bạn...."
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
                              <h5 style={{ color: "white" }}>Ngày sinh</h5>

                              <Field
                                name={"birthday"}
                                id="birthday"
                                style={{
                                  width: "100%",
                                  height: "40px",
                                  borderRadius: "15px",
                                  backgroundColor: "#1F2122",
                                  color: "white",
                                  borderColor: "white",
                                }}
                                type="date"
                                placeholder="Hãy nhập chiều cao của bạn...."
                              ></Field>
                              <hr></hr>
                              <h5 style={{ color: "white" }}>Giới tính</h5>

                              <Field
                                as="select"
                                name="gender"
                                style={{
                                  width: "100%",
                                  height: "40px",
                                  borderRadius: "15px",
                                  backgroundColor: "#1F2122",
                                  color: "white",
                                  borderColor: "white",
                                }}
                              >
                                <option value={"Nam"} selected>
                                  Nam
                                </option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                              </Field>
                              <h6>
                                {" "}
                                Bạn đã có tài khoản đăng nhập tại đây{" "}
                                <Link to={"/"} style={{ color: "red" }}>
                                  {" "}
                                  Đăng nhập{" "}
                                </Link>
                              </h6>

                              <div class="main-border-button border-no-active "></div>
                            </div>
                          </div>
                          <div class="col-lg-2 align-self-center">
                            <div class="main-info header-text">
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
                                Đăng ký
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
          </div>
        </Form>
      </Formik>
    </>
  );
}
