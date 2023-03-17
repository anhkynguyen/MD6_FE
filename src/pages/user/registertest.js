export default function RegisterTest() {
  return (
    <>
      <header class="top-header"></header>

      <div id="mainCoantiner">
        <div class="main-header"></div>

        <div>
          <div class="starsec"></div>
          <div class="starthird"></div>
          <div class="starfourth"></div>
          <div class="starfifth"></div>
        </div>

        <div class="container text-center text-dark mt-5">
          <div class="row">
            <div class="col-lg-4 d-block mx-auto mt-4">
              <div class="row">
                <div class="col-xl-12 col-md-12 col-md-12">
                  <div class="card">
                    <div class="card-body wow-bg" id="formBg">
                      <h3 style={{ color: "pink" }}>Đăng Ký</h3>

                      <p style={{ color: "pink" }}>Đăng ký tài khoản của bạn</p>
                      <p style={{ color: "white", float: "left" }}>Họ tên</p>
                      <div class="input-group mb-2">
                        {" "}
                        <input
                          type="text"
                          class="form-control textbox-dg"
                          placeholder="Nhập họ tên đầy đủ của bạn"
                          style={{ color: "white" }}
                        />{" "}
                      </div>
                      <p style={{ color: "white", float: "left" }}>Mật khẩu</p>
                      <div class="input-group mb-1">
                        {" "}
                        <input
                          type="password"
                          class="form-control textbox-dg"
                          placeholder="Nhập mật khẩu bạn chọn"
                          style={{ color: "white" }}
                        />{" "}
                      </div>
                      <p style={{ color: "white", float: "left" }}>
                        Nhập lại mật khẩu
                      </p>
                      <div class="input-group mb-0">
                        {" "}
                        <input
                          type="password"
                          class="form-control textbox-dg"
                          placeholder="Nhập lại mật khẩu vừa chọn"
                          style={{ color: "white" }}
                        />{" "}
                      </div>
                      <p style={{ color: "white", float: "left" }}>Ngày sinh</p>
                      <div class="input-group mb-0">
                        {" "}
                        <input
                          type="date"
                          class="form-control textbox-dg"
                          style={{ color: "white" }}
                        />{" "}
                      </div>
                      <p style={{ color: "white", float: "left" }}>Email</p>
                      <div class="input-group mb-0">
                        {" "}
                        <input
                          type="email"
                          class="form-control textbox-dg"
                          placeholder="Nhập email của bạn"
                          style={{ color: "white" }}
                        />{" "}
                      </div>
                      <p style={{ color: "white", float: "left" }}>Giới tính</p>
                      <div class="input-group mb-0">
                        {" "}
                        <input
                          type="password"
                          class="form-control textbox-dg"
                          placeholder="Hãy chọn giới tính của bạn"
                          style={{ color: "white" }}
                        />{" "}
                      </div>

                      <div class="row">
                        <div class="col-12">
                          {" "}
                          <button
                            type="button"
                            class="btn btn-primary btn-block logn-btn"
                          >
                            Đăng ký
                          </button>{" "}
                        </div>
                        <div class="col-12">
                          <p>Bạn đã có tài khoản đăng nhập</p>{" "}
                          <a href="forgot-password.html">tại đây</a>{" "}
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
