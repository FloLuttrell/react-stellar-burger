import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from "./profile.module.css";
import {useAppDispatch} from "../../hooks";
import {authLogout} from "../../services/actions/auth";


export const ProfilePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
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
                onClick={async (ev) => {
                  ev.preventDefault();
                  try {
                    await dispatch(authLogout()).unwrap()
                    navigate("/");
                  } catch (err) {
                    // todo: handle error
                  }
                }}
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
  );
};