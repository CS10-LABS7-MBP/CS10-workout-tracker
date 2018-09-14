import * as Actions from "./actionDefinitions";
import { callbackify } from "util";
const axios = require("axios");

const ROOT_URL = "http://localhost:8080";

let requestOptions = {};
// requestOptions is updated upon receipt of a token to include that
// token as a header in axios requests. In practice, all you need
// to do to interact with an access-controlled route is include this
// requestOptions object as the final parameter in your Axios call.

export const register = data => {
  return dispatch => {
    dispatch({
      type: Actions.REGISTERING,
      payload: "Registering..."
    });
    axios
      .post(`${ROOT_URL}/register`, data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        requestOptions = { headers: {"x-access-token": res.data.token} };
        dispatch({
          type: Actions.REGISTER_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.REGISTER_FAILURE,
          payload: err
        });
      });
  };
};

export const login = data => {
  return dispatch => {
    dispatch({
      type: Actions.LOGGING_IN,
      payload: "Logging in..."
    });
    axios
      .post(`${ROOT_URL}/login`, data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        requestOptions = { headers: {"x-access-token": res.data.token} };
        dispatch({
          type: Actions.LOGIN_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.LOGIN_FAILURE,
          payload: err
        });
      });
  };
};

export const loginWithToken = (token) => {
  return dispatch => {
    dispatch({
      type: Actions.LOGGING_IN,
      payload: "Logging in with token..."
    });
    console.log("Going to apply this token as an axios header: ", token);
    requestOptions = { headers: {"x-access-token": token} };
    axios
      .get(`${ROOT_URL}/auto-login`, requestOptions)
      .then(res => {
        dispatch({ 
          type: Actions.LOGIN_SUCCESS,
          payload: res
        })
      })
      .catch(err => {
        dispatch({
          type: Actions.LOGIN_FAILURE,
          payload: err
        })
      })
  }
}

export const logout = () => {
  localStorage.setItem("token", "");
  return {
    type: Actions.LOGOUT
  };
};

export const forgotPassword = data => {
  return dispatch => {
    dispatch({
      type: Actions.SENDING_RECOVERY_EMAIL,
      payload: "Sending recovery email..."
    });
    axios
      .post(`${ROOT_URL}/forgot_password`, data)
      .then(res => {
        dispatch({
          type: Actions.SEND_EMAIL_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.SEND_EMAIL_FAILURE,
          payload: err
        });
      });
  };
};

export const resetPassword = data => {
  return dispatch => {
    dispatch({
      type: Actions.CHANGING_PASSWORD,
      payload: "Changing password..."
    });
    axios
      .post(`${ROOT_URL}/reset_password`, data)
      .then(res => {
        dispatch({
          type: Actions.CHANGE_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.CHANGE_FAILURE,
          payload: err
        });
      });
  };
};

export const addProgress = data => {
  return dispatch => {
    dispatch({
      type: Actions.ADDING_PROGRESS,
      payload: "Adding progress record..."
    });
    axios
      .post(`${ROOT_URL}/progress`, data)
      .then(res => {
        dispatch({
          type: Actions.ADD_PROGRESS_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: Actions.ADD_PROGRESS_FAILURE,
          payload: err
        });
      });
  };
};
