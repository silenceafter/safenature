// actions/userActions.js
import { createAction } from '@reduxjs/toolkit';

export const fetchAccountDataRequest = createAction('FETCH_ACCOUNT_DATA_REQUEST');
export const fetchAccountDataSuccess = createAction('FETCH_ACCOUNT_DATA_SUCCESS');
export const fetchAccountDataFailure = createAction('FETCH_ACCOUNT_DATA_FAILURE');

/*export const fetchAccountDataRequest = () => ({
    type: FETCH_ACCOUNT_DATA_REQUEST,  
  });
  
  export const fetchAccountDataSuccess = (data) => ({
    type: FETCH_ACCOUNT_DATA_SUCCESS,
    payload: data,
  });
  
  export const fetchAccountDataFailure = (error) => ({
    type: FETCH_ACCOUNT_DATA_FAILURE,
    payload: error,
  });*/

export const fetchAccountData = (token) => {
    return async (dispatch) => {
        //dispatch(fetchAccountDataRequest());
        try {
            const response = await fetch('https://localhost:7086/account/get-current-user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            //
            if (response.ok) {
                const data = await response.json();
                dispatch({type: 'FETCH_ACCOUNT_DATA_SUCCESS', payload: response.data});
            } else {
                dispatch({type: 'FETCH_ACCOUNT_DATA_FAILURE', error: error.message});
            }
        } catch (error) {
            dispatch({type: 'FETCH_ACCOUNT_DATA_FAILURE', error: error.message});
        }
    };
};