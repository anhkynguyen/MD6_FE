import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile, changeStatus } from "../../service/userService";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../upload/firebaseConfig";
import { addProvider } from "../../service/providerService";
import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { getProvision } from "../../service/provisionService";
import { addPersonal } from "../../service/personalService";

const validateSchema = Yup.object().shape({
  namePost: Yup.string().required("Vui lòng không để trống !"),
  description: Yup.string().required("Vui lòng không để trống !"),
  price: Yup.string().required("Vui lòng không để trống !"),
  height: Yup.string().required("Vui lòng không để trống !"),
  weight: Yup.string().required("Vui lòng không để trống !"),
  measurement: Yup.string().required("Vui lòng không để trống !"),
});

export default function ProfileProvider() {
  const [checked, setChecked] = useState([]);
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.profile;
    }
  });
  
  const provisions = useSelector((state) => {
    console.log(state, 333);
    return state.provision.provisions;
  });
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const user1 = useSelector((state) => {
    return state.user.currentUser;
  });
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
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
      .then(() =>
        swal({ title: "Ảnh đã được tải lên thành công ", icon: "success" })
      )
      .catch((err) => console.log(err));
  };

  const handleAdd = (values) => {
    let data = { ...values, user: user1.idUser };
    console.log(data, 2333333333);
    dispatch(addProvider(data)).then(() => {
      navigate("/home");
    });
  };
  const handleAddPersonal = (value) => {
    let data1 = checked;
    dispatch(addPersonal(data1));
  };
  useEffect(() => {
    dispatch(getProfile(idUser));
  }, []);
  useEffect(() => {
    dispatch(getProvision());
    
  }, []);

  return (
    <>
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <div class="row">
                <div class="col-lg-12">
                  <div class="main-profile ">
                    <div class="row">
                      <div class="col-lg-4">
                        <img
                          src={user.avatar}
                          alt=""
                          style={{
                            borderRadius: "23PX",
                            width: "356px",
                            height: "340px",
                          }}
                        />
                      </div>
                      <div class="col-lg-4 align-self-center">
                        <div class="main-border-button">
                          <h4>Trạng thái</h4>
                          <button
                            type="submit"
                            class="btn btn "
                            onClick={() => {
                              swal({
                                title:
                                  "Bạn có muốn thay đổi trạng thái không ?",
                                text: "",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  dispatch(changeStatus(user.idUser)).then(
                                    () => {
                                      dispatch(getProfile(idUser));
                                    }
                                  );
                                  swal({
                                    title: "Bạn đã đổi trạng thái thành công !",
                                    icon: "success",
                                  });
                                } else {
                                  swal({
                                    title:
                                      "Bạn đã hủy thao tác thay đổi trạng thái !",
                                    icon: "error",
                                  });
                                }
                              });
                            }}
                          >
                            <i
                              class="fa-solid fa-arrows-rotate fa-spin fa-2xl"
                              style={{ color: "#2dd730" }}
                            ></i>
                          </button>
                          <h3
                            style={{
                              color: "yellow",
                              borderRadius: "15px",
                              height: "40px",
                              border: "black",
                            }}
                          >
                            {user.status}{" "}
                          </h3>
                        </div>
                        <br></br>
                        <div class="main-info header-text">
                          <h4>{user.username}</h4>
                          <br /> <p> Người cung cấp dịch vụ</p>
                          <br />
                          <button
                            class="btn btn-primary btn-block logn-btn"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            {" "}
                            Thêm bài đăng
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
                            <div class="modal-dialog modal-xl">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h3
                                    style={{
                                      textAlign: "center",
                                      width: "100%",
                                    }}
                                  >
                                    Thêm mới bài đăng
                                  </h3>

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
                                      initialValues={{
                                        namePost: "",
                                        description: "",
                                        image: "",
                                        price: "",
                                        height: "",
                                        weight: "",
                                        measurement: "",
                                        idProvision: [checked],
                                      }}
                                      validationSchema={validateSchema}
                                      onSubmit={(values) => {
                                        values.image = urls[0];
                                        values.idUser = user1.idUser;
                                        handleAddPersonal();
                                        handleAdd(values).then(() => {
                                          swal({
                                            title: "Đăng bài thành công !",
                                            icon: "success",
                                          }).then(() => {
                                            navigate("/home");
                                          });
                                        });
                                      }}
                                    >
                                      <Form>
                                        <div class="container">
                                          <div class="row">
                                            {" "}
                                            <div class="col-md-4">
                                              <div>
                                                {" "}
                                                <img
                                                  src={urls[0]}
                                                  alt={urls[0]}
                                                  style={{
                                                    borderRadius: "23px",
                                                    width: "100%",
                                                    height: "330px",
                                                  }}
                                                />
                                              </div>

                                              <input
                                                id="image"
                                                name={"image"}
                                                type="file"
                                                onChange={handleChange}
                                              />
                                              <button
                                                type="button"
                                                class="btn btn-primary btn-block logn-btn"
                                                onClick={() =>
                                                  dispatch(handleUpload)
                                                }
                                              >
                                                Upload
                                              </button>
                                            </div>
                                            <div class="col-md-8  ">
                                              <div class="form-row">
                                                <div class="form-holder">
                                                  <h5
                                                    style={{
                                                      color: "#e75e8d",
                                                      lineHeight: "0px",
                                                    }}
                                                  >
                                                    Tên bài đăng
                                                  </h5>
                                                  <br></br>
                                                  <alert
                                                    className="text-danger"
                                                    style={{
                                                      float: "left",
                                                    }}
                                                  >
                                                    <ErrorMessage
                                                      name={"namePost"}
                                                    ></ErrorMessage>
                                                  </alert>{" "}
                                                  <Field
                                                    style={{
                                                      backgroundColor: "white",
                                                      color: "pink",
                                                      border: "solid",
                                                    }}
                                                    type="text"
                                                    name={"namePost"}
                                                    id="namePost"
                                                    placeholder="Tên bài đăng"
                                                    class="form-control"
                                                  />
                                                </div>

                                                <div class="form-holder">
                                                  <h5
                                                    style={{
                                                      color: "#e75e8d",
                                                      lineHeight: "0px",
                                                    }}
                                                  >
                                                    Chiều cao
                                                  </h5>
                                                  <br></br>
                                                  <alert
                                                    className="text-danger"
                                                    style={{
                                                      float: "left",
                                                    }}
                                                  >
                                                    <ErrorMessage
                                                      name={"height"}
                                                    ></ErrorMessage>
                                                  </alert>{" "}
                                                  <Field
                                                    style={{
                                                      backgroundColor: "white",
                                                      color: "pink",
                                                      border: "solid",
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
                                                  <h5
                                                    style={{
                                                      color: "#e75e8d",
                                                      lineHeight: "0px",
                                                    }}
                                                  >
                                                    Cân nặng
                                                  </h5>
                                                  <alert
                                                    className="text-danger"
                                                    style={{
                                                      float: "left",
                                                    }}
                                                  >
                                                    <ErrorMessage
                                                      name={"weight"}
                                                    ></ErrorMessage>
                                                  </alert>{" "}
                                                  <br></br>
                                                  <Field
                                                    style={{
                                                      backgroundColor: "white",
                                                      color: "pink",
                                                      border: "solid",
                                                    }}
                                                    type="number"
                                                    name={"weight"}
                                                    id="weight"
                                                    placeholder="Cân nặng của bạn (kg)"
                                                    class="form-control"
                                                  />
                                                </div>
                                                <div class="form-holder">
                                                  <h5
                                                    style={{
                                                      color: "#e75e8d",
                                                      lineHeight: "0px",
                                                    }}
                                                  >
                                                    Số đo ba vòng
                                                  </h5>
                                                  <alert
                                                    className="text-danger"
                                                    style={{
                                                      float: "left",
                                                    }}
                                                  >
                                                    <ErrorMessage
                                                      name={"measurement"}
                                                    ></ErrorMessage>
                                                  </alert>{" "}
                                                  <br></br>
                                                  <Field
                                                    style={{
                                                      backgroundColor: "white",
                                                      color: "pink",
                                                      border: "solid",
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
                                                  <h5
                                                    style={{
                                                      color: "#e75e8d",
                                                      lineHeight: "0px",
                                                    }}
                                                  >
                                                    Giá thuê
                                                  </h5>
                                                  <alert
                                                    className="text-danger"
                                                    style={{
                                                      float: "left",
                                                    }}
                                                  >
                                                    <ErrorMessage
                                                      name={"price"}
                                                    ></ErrorMessage>
                                                  </alert>{" "}
                                                  <br></br>
                                                  <Field
                                                    style={{
                                                      backgroundColor: "white",
                                                      color: "pink",
                                                      border: "solid",
                                                    }}
                                                    name={"price"}
                                                    id="price"
                                                    type="number"
                                                    placeholder="Giá thuê theo giờ"
                                                    class="form-control"
                                                  />
                                                </div>
                                                <div class="form-holder">
                                                  <h5
                                                    style={{
                                                      color: "#e75e8d",
                                                      lineHeight: "0px",
                                                    }}
                                                  >
                                                    Sở thích
                                                  </h5>
                                                  <alert
                                                    className="text-danger"
                                                    style={{
                                                      float: "left",
                                                    }}
                                                  >
                                                    <ErrorMessage
                                                      name={"description"}
                                                    ></ErrorMessage>
                                                  </alert>{" "}
                                                  <br></br>
                                                  <Field
                                                    name={"description"}
                                                    id="description"
                                                    style={{
                                                      backgroundColor: "white",
                                                      color: "pink",
                                                      border: "solid",
                                                    }}
                                                    type="text"
                                                    placeholder="Sở thích của bạn"
                                                    class="form-control"
                                                  />
                                                </div>
                                              </div>
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
                                                    <label>
                                                      {" "}
                                                      {item.provisionName}
                                                    </label>
                                                  </label>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        </div>{" "}
                                        <div class="modal-footer">
                                          <button
                                            type="button"
                                            class="btn btn-primary btn-block logn-btn"
                                            data-bs-dismiss="modal"
                                          >
                                            Hủy
                                          </button>
                                          <button
                                            type="submit"
                                            class="btn btn-primary btn-block logn-btn"
                                          >
                                            Thêm mới
                                          </button>
                                        </div>
                                      </Form>
                                    </Formik>
                                  </>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="main-border-button"></div>
                        </div>
                      </div>
                      <div class="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Giới tính <span> {user.gender}</span>
                          </li>
                          <li>
                            Ngày sinh <span>{user.birthday}</span>
                          </li>
                          <li>
                            Email <span>{user.gmail}</span>
                          </li>
                          <li>
                            Chức vụ <span>{user.role}</span>
                          </li>
                        </ul>
                        <Link to={"/user/change-password/" + user.idUser}>
                          <button
                            style={{ float: "right", width: "100%" }}
                            type="submit"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Đổi mật khẩu
                          </button>{" "}
                        </Link>
                        <Link to={"/home/edit-post/" + user.idUser}>
                          <button
                            style={{ float: "right", width: "100%" }}
                            type="submit"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Cập nhật thông tin bài đăng
                          </button>{" "}
                        </Link>
                      </div>
                    </div>
                    <div class="row"></div>
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
