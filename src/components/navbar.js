import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { searchProviderByName } from "../service/providerService";
import NavbarAdmin from "./navbarAdmin";

export default function Navbar() {
  const user = useSelector((state) => state.user.currentUser);
  const [page, setPage] = useSearchParams();

  const totalPages = useSelector((state) => {
    if (state.post !== undefined) {
      return state.post.posts.totalPage;
    }
  });
  const dispatch = useDispatch();
  const handleSearch = (value) => {
    dispatch(searchProviderByName(value));
  };
  return (
    <>
      {user.role !== "admin" ? (
        <div
          class="header-area"
          style={{ position: "sticky", backgroundColor: "rgb(31,33,34)" }}
        >
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
                        placeholder="Nhập gì đó"
                        id="searchText"
                        onkeypress="handle"
                        className="form-control"
                        type="search"
                        name={"search"}
                        aria-label="Search"
                        style={{ maxWidth: "250px" }}
                        onKeyUp={(e) => {
                          handleSearch(e.target.value);
                        }}
                      />
                      <i class="fa fa-search"></i>
                    </form>
                  </div>
                  <ul class="nav">
                    <li>
                      <a href="/home" class="active">
                        Trang chủ
                      </a>
                    </li>
                    {/* <li>
                      <a href="/home/add-post">Đăng Bài</a>
                    </li> */}
                    {user.role === "seller" || user.role === "Vip" ? (
                      <>
                        <li>
                          <a href={`/order/showOrderInSeller/${user.idUser}`}>
                            Quản lý đơn đặt hàng{" "}
                          </a>
                        </li>
                        <li>
                          <a href={`/order/showOrderInUser/${user.idUser}`}>
                            Quản lý đơn đã thuê
                          </a>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link to={`/order/showOrderInUser/${user.idUser}`}>
                          Quản lý đơn đã thuê
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link to={`/user/${user.idUser}`}>
                        <>{user.username}</>

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
                      alt="logout"
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
      ) : (
        <NavbarAdmin></NavbarAdmin>
      )}
    </>
  );
}
