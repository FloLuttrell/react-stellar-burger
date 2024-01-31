import {getAuthTokens} from "../../utils/functions";
import {Navigate} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

export const WithAuthPage = ({children}) => {
  const {refreshToken} = getAuthTokens();
  if (!refreshToken) {
    return (<Navigate to="/login"></Navigate>);
  }
  return children;
};
WithAuthPage.propTypes = {
  children: PropTypes.any,
}

export const WithoutAuthPage = ({children}) => {
  const {refreshToken} = getAuthTokens();
  if (refreshToken) {
    return (<Navigate to="/profile"></Navigate>);
  }
  return children;
};
WithoutAuthPage.propTypes = {
  children: PropTypes.any,
}