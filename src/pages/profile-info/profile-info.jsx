import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {fetchJsonWithAuth} from "../../utils/functions";
import {API_BASE_URL} from "../../utils/consts";
import {setUser,} from "../../services/actions/auth";

export const ProfileInfoPage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth);
  const {email, name} = authState.user;
  const [nameState, setNameState] = useState({value: name, valid: true, readonly: true});
  const nameRef = useRef(null);
  const [emailState, setEmailState] = useState({value: email, valid: true, readonly: true});
  const emailRef = useRef(null);
  const [passwordState, setPasswordState] = useState({value: "", valid: true, readonly: true});
  const [formState, setFormState] = useState({valid: false, dirty: false});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setNameState({...nameState, value: name});
    setEmailState({...emailState, value: email});
  }, [name, email]);

  const resetForm = () => {
    setNameState({value: name, valid: true, readonly: true});
    setEmailState({value: email, valid: true, readonly: true});
    setPasswordState({value: "", valid: true, readonly: true});
    setFormState({valid: false, dirty: false});
  };

  const onResetBtnClick = (ev) => {
    ev.preventDefault();
    resetForm();
  };

  const onSubmitBtnClick = async (ev) => {
    ev.preventDefault();
    try {
      const body = {
        email: emailState.value,
        name: nameState.value
      };
      if (passwordState.value) {
        body.password = passwordState.value;
      }
      const {resp, data} = await fetchJsonWithAuth(`${API_BASE_URL}/auth/user`, {
        method: "PATCH",
        body: body
      });
      if (resp.ok && data.success === true) {
        resetForm();
        dispatch(setUser(data.user));
      }
    } catch (err) {
      setErrorMessage("Unknown error happened");
    }
  };
  return (
    <>
      <form className={``}>
        <Input
          type="text"
          placeholder="Имя"
          extraClass="mb-6"
          icon="EditIcon"
          ref={nameRef}
          readOnly={nameState.readonly}
          value={nameState.value}
          onIconClick={(ev) => {
            setNameState({...nameState, value: name, readonly: false});
            nameRef.current?.focus();
          }}
          onChange={(ev) => {
            setNameState({...nameState, value: ev.target.value});
            setFormState({...formState, dirty: true, valid: ev.target.form.checkValidity()});
          }}
          onBlur={() => {
            setNameState({...nameState, readonly: true});
          }}
        />
        <Input
          type="email"
          placeholder="Логин"
          extraClass="mb-6"
          icon="EditIcon"
          ref={emailRef}
          readOnly={emailState.readonly}
          value={emailState.value}
          onIconClick={(ev) => {
            setEmailState({...emailState, value: email, readonly: false});
            emailRef.current?.focus();
          }}
          onChange={(ev) => {
            setEmailState({...emailState, value: ev.target.value});
            setFormState({...formState, dirty: true, valid: ev.target.form.checkValidity()});
          }}
          onBlur={() => {
            setEmailState({...emailState, readonly: true});
          }}
        />
        <PasswordInput
          icon="EditIcon"
          value={passwordState.value}
          onChange={(ev) => {
            setPasswordState({...passwordState, value: ev.target.value});
            setFormState({...formState, dirty: true, valid: ev.target.form.checkValidity()});
          }}
        />
        <p className="text text_type_main-default text_color_inactive"></p>
        {formState.dirty && (
          <>
            <Button
              htmlType="submit"
              type="secondary"
              size="medium"
              onClick={onResetBtnClick}
            >
              Отменить
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={!formState.valid}
              onClick={onSubmitBtnClick}
            >
              Сохранить
            </Button>
          </>
        )}
      </form>
    </>
  );
};