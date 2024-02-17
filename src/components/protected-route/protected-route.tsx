import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../../hooks";


export const WithAuthPage: React.FunctionComponent = ({children}) => {
  const authState = useAppSelector((s) => s.auth);
  const location = useLocation();
  console.log(authState)
  if (!authState.user.email && !authState.user.pending && !authState.tokens.pending) {
    return (<Navigate to="/login" state={{redirectTo: location.pathname}}></Navigate>);
  }
  if (!authState.user.email) {
    return (<></>)
  }
  return (
    <>
      {children}
    </>
  );
};

export const WithoutAuthPage: React.FunctionComponent = ({children}) => {
  const authState = useAppSelector((s) => s.auth);
  if (authState.user.email) {
    return (<Navigate to="/profile"></Navigate>);
  }
  return (
    <>
      {children}
    </>
  );
};