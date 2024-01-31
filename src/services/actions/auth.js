export const AUTH_SET_USER = "AUTH_SET_USER";
export const AUTH_RESET = "AUTH_RESET";


export const setUser = ({email, name}) => {
  return {
    type: AUTH_SET_USER,
    payload: {email, name}
  };
};


export const resetAuth = () => {
  return {type: AUTH_RESET};
};

