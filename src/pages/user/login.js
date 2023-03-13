export default function Login() {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <div class="row">
                <div class="col-lg-12">
                  <div class="main-profile ">
                    <div class="row">
                      <div class="col-lg-5">
                        <img
                          src="https://media.travelmag.vn/resize/800x564/files/linhhuong/2020/09/27/sept-commercial-cqu3ddnwtkq-unsplash-1743.jpg"
                          alt=""
                          style={{ borderRadius: "23px", height: "400px" }}
                        />
                      </div>

                      <div class="col-lg-7 align-self-center">
                        <div class="main-info header-text">
                          <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>
                          <br></br>
                          <h4 style={{ color: "white" }}>Email</h4>
                          <input
                            type="email"
                            style={{
                              width: "80%",
                              height: "40px",
                              borderRadius: "15px",
                              backgroundColor: "#1F2122",
                              color: "white",
                              borderColor: "white",
                            }}
                          ></input>
                          <br />
                          <br />

                          <h4 style={{ color: "white" }}>Mật khẩu</h4>
                          <input
                            style={{
                              width: "80%",
                              height: "40px",
                              borderRadius: "15px",
                              backgroundColor: "#1F2122",
                              color: "white",
                              borderColor: "white",
                            }}
                            type="password"
                          ></input>

                          <div class="main-border-button border-no-active ">
                            <a
                              href="/"
                              style={{
                                color: "white",
                                fontSize: "medium",
                                borderColor: "white",
                              }}
                            >
                              Đăng nhập
                            </a>
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
    </>
  );
}
