import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import {NavLink} from "react-router-dom";

function AppHeader() {
  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <nav className={`${styles.headerNav}`}>
        <ul className={styles.ul}>
          <li className={`pr-4`}>
            <NavLink to="/" className={`${styles.headerLink} pl-5 pr-5`}>
              {({isActive}) => {
                const iconType = isActive ? "primary" : "secondary";
                const cls = isActive ? styles.linkActive : "text_color_inactive";
                return (
                  <>
                    <BurgerIcon type={iconType}/>
                    <p className={`text text_type_main-default pl-2 ${cls}`}>Конструктор</p>
                  </>
                );
              }}
            </NavLink>
          </li>

          <li className={`pr-4`}>
            <NavLink to="/order-feed" className={`${styles.headerLink} pl-5 pr-5`}>
              {({isActive}) => {
                const iconType = isActive ? "primary" : "secondary";
                const cls = isActive ? styles.linkActive : "text_color_inactive";
                return (
                  <>
                    <ListIcon type={iconType}/>
                    <p className={`text text_type_main-default pl-2 ${cls}`}>Лента заказов</p>
                  </>
                );
              }}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Logo/>
      </div>
      <nav className={`${styles.headerNav}`}>
        <ul className={`${styles.ul} ${styles.headerNavRight}`}>
          <li className={`pr-4`}>
            <NavLink to="/profile" className={`${styles.headerLink} pl-5 pr-5`}>
              {({isActive}) => {
                const iconType = isActive ? "primary" : "secondary";
                const cls = isActive ? styles.linkActive : "text_color_inactive";
                return (
                  <>
                    <ProfileIcon type={iconType}/>
                    <p className={`text text_type_main-default pl-2 ${cls}`}>Личный кабинет</p>
                  </>
                );
              }}
            </NavLink>


          </li>
        </ul>
      </nav>
    </header>)
    ;
}

export default AppHeader;

