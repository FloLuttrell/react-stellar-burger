import AppHeader from "../../components/app-header/app-header";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from "./profile.module.css";
import {useDispatch} from "react-redux";
import {fetchJson, getAuthTokens} from "../../utils/functions";
import {API_BASE_URL} from "../../utils/consts";
import {resetAuth} from "../../services/actions/auth";


export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutClick = async (ev) => {
    ev.preventDefault();
    try {
      const {refreshToken} = getAuthTokens();
      const {resp, data} = await fetchJson(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        body: {token: refreshToken}
      });
      if (resp.ok && data.success === true) {
        dispatch(resetAuth());
        navigate("/");
      } else {
        // todo: handle error
      }
    } catch (err) {
      // todo: handle error
    }
  };
  return (
    <>
      <AppHeader></AppHeader>
      <div className={`pt-20 ${styles.profile}`}>
        <div className={`${styles.menu}`}>
          <ul className="text text_type_main-medium">
            <li>
              <NavLink to="/profile" end>
                {({isActive}) => {
                  const cls = isActive ? styles.linkActive : "text_color_inactive";
                  return (
                    <span className={cls}>Профиль</span>
                  );
                }}
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile/orders">
                {({isActive}) => {
                  const cls = isActive ? styles.linkActive : "text_color_inactive";
                  return (
                    <span className={cls}>История заказов</span>
                  );
                }}
              </NavLink>
            </li>
            <li>
              <span
                className={"text_color_inactive"}
                onClick={onLogoutClick}
              >
                Выход
              </span>
            </li>
          </ul>
          <p className={`mt-20 text text_type_main-default text_color_inactive`} style={{opacity: 0.4}}>
            В этом разделе вы можете изменить свои
            персональные данные</p>
        </div>
        <Outlet/>
      </div>
    </>
  );
};