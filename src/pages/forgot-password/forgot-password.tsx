import {Button, Input,} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import {useState} from "react";
import {API_BASE_URL} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {fetchJson} from "../../utils/functions";
import {AppHeader} from "../../components/app-header/app-header";


export const ForgotPasswordPage: React.FunctionComponent = () => {
  const [emailState, setEmailState] = useState({value: "", valid: true});
  const [formState, setFormState] = useState({valid: false});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  return (
    <>
      <AppHeader></AppHeader>
      <section className={styles.forgot}>
        <h2 className={`mb-6 text text_type_main-medium`}
        >
          Восстановление пароля
        </h2>
        <form
          className={styles.form}
          name="forgotpass-form"
          onSubmit={async (ev) => {
            ev.preventDefault();
            try {
              const {resp, data} = await fetchJson(`${API_BASE_URL}/password-reset`, {
                method: "POST",
                body: {email: emailState.value}
              });
              if (resp.ok && data.success === true) {
                navigate("/reset-password", {state: {email: emailState.value}});
              } else if (!resp.ok && data.success === false) {
                setErrorMessage(data.message);
              } else {
                setErrorMessage("Unknown error happened");
              }
            } catch (err) {
              setErrorMessage("Unknown error happened");
            }
          }}
        >
          <Input
            type="email"
            name="email"
            placeholder={"Укажите e-mail"}
            extraClass="mt-6"
            required={true}
            value={emailState.value}
            error={!emailState.valid}
            errorText="Некорректный e-mail"
            onChange={(ev) => {
              if (!ev.target.form) {
                return;
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
          <p className="text text_type_main-default text_color_inactive">
            {errorMessage}
          </p>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`mt-6 ${styles.button}`}
            disabled={!formState.valid}
          >
            Восстановить
          </Button>
        </form>
        <p
          className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}
        >
          Вспомнили пароль?
          <Button
            onClick={() => navigate("/login")}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.link}
          >
            Войти
          </Button>
        </p>
      </section>
    </>
  );
};
