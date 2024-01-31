import styles from "./login.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import {setUser} from "../../services/actions/auth";
import {fetchJson, setAuthTokens} from "../../utils/functions";
import {API_BASE_URL} from "../../utils/consts";

export const LoginPage = () => {
  const [emailState, setEmailState] = useState({value: "", valid: true});
  const [passwordState, setPasswordState] = useState({value: "", valid: true});
  const [formState, setFormState] = useState({valid: false});
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const {resp, data} = await fetchJson(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        body: {
          email: emailState.value,
          password: passwordState.value,
        }
      });
      if (resp.ok && data.success === true) {
        setAuthTokens(data);
        dispatch(setUser(data.user));
        navigate("/");
      } else if (!resp.ok && data.success === false) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Unknown error happened");
      }
    } catch (err) {
      setErrorMessage("Unknown error happened");
    }
  };

  return (
    <div>
      <AppHeader></AppHeader>
      <form className={`${styles.login}`} onSubmit={onFormSubmit}>
        <h2 className={`mb-6 text text_type_main-medium`}>
          Вход
        </h2>
        <Input
          type="email"
          placeholder={"Укажите e-mail"}
          extraClass="mb-6"
          name={"email"}
          value={emailState.value}
          required={true}
          error={!emailState.valid}
          errorText="Некорректный e-mail"
          onChange={(ev) => {
            setEmailState({
              value: ev.target.value,
              valid: true
            });
            setFormState({valid: ev.target.form.checkValidity()});
          }}
          onFocus={(ev) => {
            setEmailState({
              value: ev.target.value,
              valid: true
            });
          }}
          onBlur={(ev) => {
            setEmailState({
              value: ev.target.value,
              valid: ev.target.value ? ev.target.checkValidity() : true
            });
          }}
        />
        <PasswordInput
          extraClass="mb-6"
          value={passwordState.value}
          name={"password"}
          required={true}
          // todo: f*cking yandex component hardcoded min length to 6
          minLength={6}
          onChange={(ev) => {
            setPasswordState({
              value: ev.target.value,
              valid: true
            });
            setFormState({valid: ev.target.form.checkValidity()});
          }}
        />
        <p className="text text_type_main-default text_color_inactive">
          {errorMessage}
        </p>
        <Button
          type="primary"
          size="medium"
          extraClass="mb-20"
          htmlType="submit"
          disabled={!formState.valid}
        >
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-6">Вы - новый пользователь?
          <Link className={styles.a} to={"/register"}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?
          <Link className={styles.a} to={"/forgot-password"}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>

  );
};

export default LoginPage;