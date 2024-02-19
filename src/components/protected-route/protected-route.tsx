import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../../hooks";


type ProtectedRouteProps = {
  anonymous: boolean
}
export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({ anonymous, children}) => {
  const auth = useAppSelector((store) => store.auth);
  const authLoggedIn = auth.user.email;
  const location = useLocation();
  if (anonymous && authLoggedIn) {
    return (<Navigate to={ location.state?.redirectTo ?? "/"}></Navigate>);
  }
  if (!anonymous && !authLoggedIn) {
    return (<Navigate to="/login" state={{redirectTo: location.pathname}}></Navigate>);
  }
  return (<>{children}</>);
}