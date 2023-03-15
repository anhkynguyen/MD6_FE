import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProviders } from "../../service/providerService";
export default function ListProvider() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => {
    if (state.post !== undefined) {
      return state.post.posts;
    }
  });
  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.user;
    }
  });

  useEffect(() => {
    dispatch(getProviders());
  }, []);
  return (
    <>
      <div class="most-popular">
        <div class="row">
          <div class="col-lg-12">
            <div class="heading-section">
              <br></br>
              <br></br>
              <br></br>
              <div class="col-lg-12">
                <div class="main-button"></div>
              </div>
              <br></br>
            </div>
            <div className="row">
              {user !== undefined &&
                posts &&
                posts.map((item) => {
                  if (user !== undefined && item.gmail === user.gmail) {
                    return (
                      <div className="col-lg-3 col-sm-6">
                        <div className="item">
                          <img src={item.avatar} alt="" />
                          <h4>
                            {item.namePost}
                            <br />
                            <span>{item.price}</span>
                          </h4>
                          <ul>
                            <li>
                              <i className="fa fa-star"></i> 4.8
                            </li>
                            <li>
                              <i className="fa fa-download"></i> 2.3M
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
