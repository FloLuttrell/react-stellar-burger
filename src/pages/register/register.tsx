import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./register.module.css";
import {fetchJson, setAuthTokens} from "../../utils/functions";
import {API_BASE_URL} from "../../utils/consts";
import {useAppDispatch} from "../../hooks";
import {setAuthPending, setUser} from "../../services/reducers/auth";
import {AppHeader} from "../../components/app-header/app-header";

export const RegisterPage: React.FunctionComponent = () => {
  const [nameState, setNameState] = useState({value: "", valid: true});
  const [emailState, setEmailState] = useState({value: "", valid: true});
  const [passwordState, setPasswordState] = useState({value: "", valid: true});
  const [formState, setFormState] = useState({valid: true});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <AppHeader/>
      <form className={`${styles.registerPage}`} onSubmit={async (ev) => {
        ev.preventDefault();
        try {
          dispatch(setAuthPending(true));
          const {resp, data} = await fetchJson(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            body: {
              name: nameState.value,
              email: emailState.value,
              password: passwordState.value,
            }
          });
          if (resp.ok && data.success === true) {
            setAuthTokens(data);
            dispatch(setUser(data.user));
            navigate("/profile");
          } else if (!resp.ok && data.success === false) {
            setErrorMessage(data.message);
          } else {
            setErrorMessage("Unknown error happened");
          }
        } catch (err) {
          setErrorMessage("Unknown error happened");
        } finally {
          dispatch(setAuthPending(false));
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
    </>
  );
};