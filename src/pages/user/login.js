import {login} from "../../service/userService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import swal from "sweetalert";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (value)=>{
        dispatch(login(value)).then((state)=>{
            if (state.payload.data !== "User not found" && state.payload.data !== "Wrong password"){
                swal("Đăng nhập thành công!", {
                    icon: "success",
                }).then(()=>{return  navigate('/home')});

            }else {
                swal("Sai mật khẩu hoặc tài khoản!", {
                });
                return  navigate('/')
            }
        })
    }

    // const handleRegister = (value) => {
    //     dispatch(register(value)).then(() => {
    //         console.log(value)
    //         swal("Đăng ký thành công!", {
    //             icon: "success",
    //         }).then(() => {
    //             return navigate('/')
    //         });
    //
    //     })
    // }


  return (
    <>
        <Formik initialValues={{gmail: '', password: ''}} onSubmit={(values)=>{
            handleLogin(values)
        }}>
            <Form>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="main-profile ">
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <img
                                                        src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/01/app-hen-ho-2.jpg"
                                                        alt=""
                                                        style={{borderRadius: "23px", height: "400px"}}
                                                    />
                                                </div>
                                                <div className="col-lg-7 align-self-center">
                                                    <div className="main-info header-text">
                                                        <h1 style={{textAlign: "center"}}>Đăng nhập</h1>
                                                        <br></br>
                                                        <h4 style={{color: "white"}}>Email</h4>
                                                        <Field
                                                            type="email"
                                                            style={{
                                                                width: "80%",
                                                                height: "40px",
                                                                borderRadius: "15px",
                                                                backgroundColor: "#1F2122",
                                                                color: "white",
                                                                borderColor: "white",
                                                            }}
                                                            name="gmail"
                                                        />
                                                        <br/>
                                                        <br/>

                                                        <h4 style={{color: "white"}}>Mật khẩu</h4>
                                                        <Field
                                                            style={{
                                                                width: "80%",
                                                                height: "40px",
                                                                borderRadius: "15px",
                                                                backgroundColor: "#1F2122",
                                                                color: "white",
                                                                borderColor: "white",
                                                            }}
                                                            type="password"
                                                            name="password"
                                                        />

                                                        <div className="main-border-button border-no-active ">

                                                                <button
                                                                    style={{
                                                                        width: "20%",
                                                                        height: "40px",
                                                                        borderRadius: "15px",
                                                                        backgroundColor: "#1F2122",
                                                                        color: "white",
                                                                        borderColor: "white",
                                                                    }}
                                                                >
                                                                    Đăng nhập
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
            </Form>
        </Formik>

    </>
  );
}
