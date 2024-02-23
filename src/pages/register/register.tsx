import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./register.module.css";
import {useAppDispatch} from "../../hooks";
import {authRegister} from "../../services/actions/auth";

export const RegisterPage: React.FunctionComponent = () => {
  const [nameState, setNameState] = useState({value: "", valid: true});
  const [emailState, setEmailState] = useState({value: "", valid: true});
  const [passwordState, setPasswordState] = useState({value: "", valid: true});
  const [formState, setFormState] = useState({valid: true});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <form className={`${styles.registerPage}`} onSubmit={async (ev) => {
      ev.preventDefault();
      try {
        await dispatch(authRegister({
          name: nameState.value,
          email: emailState.value,
          password: passwordState.value
        })).unwrap()
        navigate("/profile");
        // setErrorMessage(data.message);
      } catch (err) {
        setErrorMessage("Unknown error happened");
      }
    }}>
      <h2 className={`mb-6 text text_type_main-medium`}>
        Регистрация
      </h2>
      <Input
        type="text"
        placeholder="Имя"
        extraClass="mb-6"
        name={"name"}
        value={nameState.value}
        required={true}
        minLength={3}
        error={!nameState.valid}
        errorText="Некорректное имя"
        onChange={(ev) => {
          if (!ev.target.form) {
            return;
          }
          setNameState({
            value: ev.target.value,
            valid: true
          });
          setFormState({valid: ev.target.form.checkValidity()});
        }}
        onFocus={(ev) => {
          if (!ev) {
            return
          }
          setNameState({
            value: ev.target.value,
            valid: true
          });
        }}
        onBlur={(ev) => {
          if (!ev) {
            return
          }
          setNameState({
            value: ev.target.value,
            valid: ev.target.value ? ev.target.checkValidity() : true
          });
        }}
      />
      <Input
        type="email"
        placeholder="E-mail"
        extraClass="mb-6"
        name={"email"}
        value={emailState.value}
        error={!emailState.valid}
        errorText="Некорректный e-mail"
        required={true}
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
        name={"password"}
        value={passwordState.value}
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
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-6">Уже зарегистрированы?
        <Link className={styles.link} to={"/login"}>
          Войти
        </Link>
      </p>
    </form>
  );
};