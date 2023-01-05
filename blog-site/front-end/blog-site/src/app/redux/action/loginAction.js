import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../reducers/loginReducer";


export const loginAction = async (user, dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;
  console.log(user);

  dispatch(loginStart());
  try {
    const res = await axios.post(`${LINK_API}/users/signin`, user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailed());
  }
};
