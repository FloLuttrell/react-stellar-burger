import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import {useState} from "react";
import {fetchJson} from "../../utils/functions";
import {API_BASE_URL} from "../../utils/consts";
import AppHeader from "../../components/app-header/app-header";
import {useLocation, useNavigate} from "react-router-dom";

export const ResetPasswordPage = () => {
  const [confirmState, setConfirmState] = useState({value: "", valid: true});
  const [passwordState, setPasswordState] = useState({value: "", valid: true});
  const [formState, setFormState] = useState({valid: false});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  if (!location.state?.email) {
    navigate('/forgot-password')
  }

  const onResetPasswordFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const {resp, data} = await fetchJson(`${API_BASE_URL}/password-reset/reset`, {
        method: "POST",
        body: {
          token: confirmState.value,
          password: passwordState.value,
        }
      });
      if (resp.ok && data.success === true) {
        navigate("/login");
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
    <>
      <AppHeader></AppHeader>
      <form className={`${styles.reset}`}
            onSubmit={onResetPasswordFormSubmit}
      >
        <h2 className={`mb-6 text text_type_main-medium`}>
          Установить новый пароль
        </h2>
        <PasswordInput
          placeholder="Введите новый пароль"
          extraClass="mb-6"
          required={true}
          value={passwordState.value}
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
        <Input
          placeholder="Введите код подтверждения"
          type="text"
          extraClass="mb-6"
          value={confirmState.value}
          required={true}
          error={!confirmState.valid}
          errorText="Некорректный e-mail"
          onChange={(ev) => {
            setConfirmState({
              value: ev.target.value,
              valid: true
            });
            setFormState({valid: ev.target.form.checkValidity()});
          }}
          onFocus={(ev) => {
            setConfirmState({
              value: ev.target.value,
              valid: true
            });
          }}
          onBlur={(ev) => {
            setConfirmState({
              value: ev.target.value,
              valid: ev.target.value ? ev.target.checkValidity() : true
            });
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
          Сохранить
        </Button>
      </form>
    </>
  );
};