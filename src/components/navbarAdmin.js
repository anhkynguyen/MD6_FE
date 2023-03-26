import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div class="header-area header-sticky">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="main-nav">
              <Link to={"/home"} class="logo">
                <img src="/assets/images/logo.png" alt="" />
              </Link>

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
                  <a href="/home" class="active">
                    Home
                  </a>
                </li>
                <li>
                  <Link to={"/order/listOrder"}>Danh sách đã đặt hàng</Link>
                </li>
                <li>
                  <Link to={"/admin/listUser"}>Quản lý hội viên</Link>
                </li>
                <li>
                  <Link to={`/user/${user.idUser}`}>
                    {user.username}
                    <img
                      style={{ width: "30px", height: "30px" }}
                      src={user.avatar}
                      alt=""
                    />
                  </Link>
                </li>
              </ul>
              <Link to={"/"}>
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://cdn3.iconfinder.com/data/icons/UltimateGnome/256x256/actions/gnome-session-logout.png"
                  alt=""
                />
              </Link>
              <a href="/" class="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
