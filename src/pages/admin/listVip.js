import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getTopProviders } from "../../service/providerService";
import { getAddVip, showVip } from "../../service/userService";

export default function ListVip() {
  const dispatch = useDispatch();

  const vips = useSelector((state) => state.user.vips);
  const user = useSelector((state) => {
    if (state.user !== undefined) {
      return state.user.currentUser;
    }
  });

  useEffect(() => {
    dispatch(showVip());
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="other-games">
            <div className="row">
              <div className="heading-section">
                <h4>Thành viên VIP</h4>
              </div>
              {user !== undefined &&
                vips &&
                vips.map((item, key) => {
                  return (
                    <div className="col-lg-2">
                      <div class="item">
                        <img
                          src={item.avatar}
                          alt=""
                          style={{
                            width: "46px",
                            height: "50px",
                            borderRadius: "50%",
                            marginRight: "15px",
                          }}
                        />
                        <h4>{item.username}</h4>
                        <br />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
