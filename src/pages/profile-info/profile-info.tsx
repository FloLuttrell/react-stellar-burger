import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authUpdateUser} from "../../services/actions/auth";

export const ProfileInfoPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((s) => s.auth);
  const {email, name} = authState.user;
  const [nameState, setNameState] = useState({value: name, valid: true, readonly: true});
  const nameRef = useRef<HTMLInputElement>(null);
  const [emailState, setEmailState] = useState({value: email, valid: true, readonly: true});
  const emailRef = useRef<HTMLInputElement>(null);
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

  return (
    <form onSubmit={async (ev) => {
      ev.preventDefault();
      try {
        await dispatch(authUpdateUser({
          email: emailState.value,
          name: nameState.value,
          password: passwordState.value,
        })).unwrap();
        resetForm();
      } catch (err) {
        setErrorMessage("Unknown error happened");
      }
    }}>
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
          if (!ev.target.form) {
            return
          }
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
          if (!ev.target.form) {
            return
          }
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
          if (!ev.target.form) {
            return
          }
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
            onClick={(ev) => {
              ev.preventDefault();
              resetForm();
            }}
          >
            Отменить
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!formState.valid}
          >
            Сохранить
          </Button>
        </>
      )}
    </form>
  );
};