import styles from "./login.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {authLogin} from "../../services/actions/auth";

export const LoginPage: React.FunctionComponent = () => {
  const [emailState, setEmailState] = useState({value: "", valid: true});
  const [passwordState, setPasswordState] = useState({value: "", valid: true});
  const [formState, setFormState] = useState({valid: false});
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <form className={`${styles.login}`} onSubmit={async (ev) => {
      ev.preventDefault();
      try {
        await dispatch(authLogin({email: emailState.value, password: passwordState.value})).unwrap()
        navigate(location.state?.redirectTo ?? "/");
        // setErrorMessage(data.message);
      } catch (err) {
        setErrorMessage("Unknown error happened");
      }
    }}>
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
          if (!ev.target.form) {
            return
          }
          setEmailState({
            value: ev.target.value,
            valid: true
          });
          setFormState({valid: ev.target.form.checkValidity()});
        }}
        onFocus={(ev) => {
          if (!ev) {
            return
          }
          setEmailState({
            value: ev.target.value,
            valid: true
          });
        }}
        onBlur={(ev) => {
          if (!ev) {
            return
          }
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
          if (!ev.target.form) {
            return
          }
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
  );
};
