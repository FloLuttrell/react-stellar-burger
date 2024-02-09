import {Navigate} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../../hooks";


export const WithAuthPage: React.FunctionComponent = ({children}) => {
  const authState = useAppSelector((s) => s.auth);
  if (!authState.user.email && !authState.pending) {
    return (<Navigate to="/login"></Navigate>);
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