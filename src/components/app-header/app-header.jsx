import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";


function AppHeader() {
  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <nav className={`${styles.headerNav}`}>
        <ul className={styles.ul}>
          <li className={`pr-4`}>

            <div className={`${styles.headerLink} pl-5 pr-5`}>
              <BurgerIcon type="primary"/>
              <p className={"text text_type_main-default pl-2"}>Конструктор</p>
            </div>

          </li>

          <li className={`pr-4`}>
            <div className={`${styles.headerLink} pl-5 pr-5`}>
              <ListIcon type="secondary"/>
              <p className={"text text_type_main-default text_color_inactive pl-2"}>Лента заказов</p>
            </div>
          </li>
        </ul>
      </nav>
      <div>
        <Logo/>
      </div>
      <nav className={`${styles.headerNav}`}>
        <ul className={`${styles.ul} ${styles.headerNavRight}`}>
          <li className={`pr-4`}>

            <div className={`${styles.headerLink} pl-5 pr-5`}>
              <ProfileIcon type="secondary"/>
              <p className={"text text_type_main-default text_color_inactive pl-2"}>Личный кабинет</p>
            </div>

          </li>
        </ul>
      </nav>
    </header>);
}

export default AppHeader;


{/*<Button htmlType="button" type="secondary" size="large" extraClass={styles.menuButtonContent}>*/
}
{/*  <BurgerIcon type="primary"/>*/
}
{/*  <p className="pl-2 text text_type_main-default">Конструктор</p>*/
}
{/*</Button>*/
}
{/*<Button htmlType="button" type="secondary" size="large" extraClass={styles.menuButtonContent}>*/
}
{/*  <ListIcon type="secondary"/>*/
}
{/*  <p className="pl-2 text text_type_main-default">Лента заказов</p>*/
}
{/*</Button>*/
}
{/*<Logo/>*/
}
{/*<Button htmlType="button" type="secondary" size="large" extraClass={styles.menuButtonContent}>*/
}
{/*  <ProfileIcon type="secondary"/>*/
}
{/*  <p className="pl-2 text text_type_main-default">Личный кабинет</p>*/
}
{/*</Button>*/
}
//         </nav>
//     </div>
// );
// }

