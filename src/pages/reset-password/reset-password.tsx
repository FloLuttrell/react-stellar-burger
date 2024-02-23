import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {authSetNewPassword} from "../../services/actions/auth";
import {useAppDispatch} from "../../hooks";

export const ResetPasswordPage: React.FunctionComponent = () => {
  const [confirmState, setConfirmState] = useState({value: "", valid: true});
  const [passwordState, setPasswordState] = useState({value: "", valid: true});
  const [formState, setFormState] = useState({valid: false});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (!location.state?.email) {
    navigate('/forgot-password')
  }

  return (
    <form
      className={`${styles.reset}`}
      onSubmit={async (ev) => {
        ev.preventDefault();
        try {
          await dispatch(authSetNewPassword({token: confirmState.value, password: passwordState.value})).unwrap()
          navigate("/login");
          // setErrorMessage(data.message);
        } catch (err) {
          setErrorMessage("Unknown error happened");
        }
      }}
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
          if (ev.target.form) {
            setFormState({valid: ev.target.form.checkValidity()});
          }
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
          if (ev.target.form) {
            setFormState({valid: ev.target.form.checkValidity()});
          }
        }}
        onFocus={(ev) => {
          if (!ev) return;

          setConfirmState({
            value: ev.target.value,
            valid: true
          });
        }}
        onBlur={(ev) => {
          if (!ev) return;

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
  );
};