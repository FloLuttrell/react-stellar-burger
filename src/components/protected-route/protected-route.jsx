import {Navigate} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const WithAuthPage = ({children}) => {
  const authState = useSelector((s) => s.auth);
  if (!authState.user.email) {
    return (<Navigate to="/login"></Navigate>);
  }
  return children;
};
WithAuthPage.propTypes = {
  children: PropTypes.any,
};

export const WithoutAuthPage = ({children}) => {
  const authState = useSelector((s) => s.auth);
  if (authState.user.email) {
    return (<Navigate to="/profile"></Navigate>);
  }
  return children;
};
WithoutAuthPage.propTypes = {
  children: PropTypes.any,
};