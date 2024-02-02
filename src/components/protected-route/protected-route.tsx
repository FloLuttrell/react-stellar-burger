import {Navigate} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import {useAppSelector} from "../../hooks";


export const WithAuthPage: React.FunctionComponent = ({children}) => {
  const authState = useAppSelector((s) => s.auth);
  if (!authState.user.email) {
    return (<Navigate to="/login"></Navigate>);
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
  }  return (
    <>
      {children}
    </>
  );
};