import AuthTypes from "../constants/authTypes";

export default AuthAction = {

    logout: () => ({ type: Types.LOGOUT}),
  
    login: (token) => ({ type: AuthTypes.LOGIN, token: token })
  }