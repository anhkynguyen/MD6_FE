export default function Profile() {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-content">
              <div class="col-lg-12">
                <div class="main-profile ">
                  <div class="row">
                    <div class="col-lg-4">
                      <img
                        src="assets/images/profile.jpg"
                        alt=""
                        style={{ borderRadius: "23px" }}
                      />
                    </div>
                    <div class="col-lg-4 align-self-center">
                      <div class="main-info header-text">
                        <span>Offline</span>
                        <h4>Alan Smithee</h4>
                        <p>
                          You Haven't Gone Live yet. Go Live By Touching The
                          Button Below.
                        </p>
                        <div class="main-border-button">
                          <a href="/">Start Live Stream</a>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 align-self-center">
                      <ul>
                        <li>
                          Games Downloaded <span>3</span>
                        </li>
                        <li>
                          Friends Online <span>16</span>
                        </li>
                        <li>
                          Live Streams <span>None</span>
                        </li>
                        <li>
                          Clips <span>29</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="clips">
                        <div class="row"></div>
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
