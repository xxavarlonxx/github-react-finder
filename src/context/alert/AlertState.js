import React, { useReducer } from 'react';
import AlertReducer from './alertReducer';
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg: msg, type: type } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
