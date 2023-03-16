import {Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {editProvider, findByIdProvider} from "../../service/providerService";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "../../upload/firebaseConfig";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import swal from "sweetalert";

export default function EditProvider() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const user = useSelector(state => {
        return state.user.currentUser;
    })
    const posts = useSelector(state => {
        if (state.post.posts[0] !== undefined) {
            return state.post.posts[0]
        } else {
            return {
                namePost: '',
                description: '',
                image: '',
                price: '',
                height: '',
                weight: '',
                measurement: '',
            }
        }
    })


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
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(downloadURLs)
                            console.log("File available at", downloadURLs);
                        });
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
            setUrls([value.payload[0].image])
        })
    }, [])

    const handleEdit = (values) => {
        let data = [{...values, image: urls}, id];
        console.log(values, 454)
        data[0] = {
            idPost: data[0].idPost,
            namePost: data[0].namePost,
            image: data[0].image,
            description: data[0].description,
            price: data[0].price,
            height: data[0].height,
            weight: data[0].weight,
            measurement: data[0].measurement,
            date: data[0].date

        }
        console.log(urls)
        dispatch(editProvider(data)).then((values) => {

            swal("Edit Success !!!");
            navigate('/home');
        })

    }

    return (
        <>
            <Formik
                initialValues={posts}
                onSubmit={(values) => {
                    values.image = urls[1];
                    values.idUser = user.idUser;
                    handleEdit(values);
                }}
                enableReinitialize={true}
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
                                                    <h1 style={{textAlign: "center"}}>Sửa thông tin của bạn</h1>
                                                    <div className="col-lg-4">
                                                        <div
                                                            className="col-md-4 wow fadeInUp"
                                                            data-wow-delay="0.1s"
                                                        >
                                                            <img
                                                                className="position-relative rounded w-300 h-300"
                                                                src={urls}
                                                                alt={urls}
                                                                style={{
                                                                    borderRadius: "23px",
                                                                    height: "300px",
                                                                    width: "300px",
                                                                }}
                                                            />
                                                        </div>

                                                        <br></br>
                                                        <input

                                                            id="image"
                                                            name={'image'}
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
                                                        />
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
                                                            <h5 style={{color: "white"}}>Tên </h5>
                                                            <Field
                                                                type="text"
                                                                name={'namePost'}
                                                                id="namePost"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "40px",
                                                                    borderRadius: "15px",
                                                                    backgroundColor: "#1F2122",
                                                                    color: "white",
                                                                    borderColor: "white",
                                                                }}
                                                            />

                                                            <hr></hr>
                                                            <h5 style={{color: "white"}}>Sở thích</h5>
                                                            <Field
                                                                type="text"
                                                                name={'description'}
                                                                id="description"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "40px",
                                                                    borderRadius: "15px",
                                                                    backgroundColor: "#1F2122",
                                                                    color: "white",
                                                                    borderColor: "white",
                                                                }}
                                                            />
                                                            <hr></hr>
                                                            <h5 style={{color: "white"}}>
                                                                Giá
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
                                                                type="number"
                                                                name={'price'}
                                                                id="price"
                                                            />

                                                            <div className="main-border-button border-no-active "></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 align-self-center">
                                                        <div className="main-info header-text">
                                                            <h5 style={{color: "white"}}>Chiều cao</h5>

                                                            <Field
                                                                name={'height'}
                                                                id="height"
                                                                type="number"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "40px",
                                                                    borderRadius: "15px",
                                                                    backgroundColor: "#1F2122",
                                                                    color: "white",
                                                                    borderColor: "white",
                                                                }}
                                                            />
                                                            <hr></hr>
                                                            <h5 style={{color: "white"}}>Cân nặng</h5>

                                                            <Field
                                                                name={'weight'}
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
                                                            />
                                                            <hr></hr>
                                                            <h5 style={{color: "white"}}>Số đo 3 vòng</h5>
                                                            <Field
                                                                name={'measurement'}
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
                                                            />

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
                                                                Sửa bài
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
    )
}