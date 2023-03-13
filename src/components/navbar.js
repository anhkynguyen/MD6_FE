export default function Navbar() {
  return (
    <>
      <header class="header-area header-sticky">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="main-nav">
                <a href="index.html" class="logo">
                  <img src="assets/images/logo.png" alt="" />
                </a>

                <div class="search-input">
                  <form id="search" action="#">
                    <input
                      type="text"
                      placeholder="Type Something"
                      id="searchText"
                      name="searchKeyword"
                      onkeypress="handle"
                    />
                    <i class="fa fa-search"></i>
                  </form>
                </div>

                <ul class="nav">
                  <li>
                    <a href="index.html" class="active">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="browse.html">Browse</a>
                  </li>
                  <li>
                    <a href="details.html">Details</a>
                  </li>
                  <li>
                    <a href="streams.html">Streams</a>
                  </li>
                  <li>
                    <a href="profile.html">
                      Profile{" "}
                      <img src="assets/images/profile-header.jpg" alt="" />
                    </a>
                  </li>
                </ul>
                <a href="/" class="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
