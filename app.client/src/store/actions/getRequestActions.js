// actions/userActions.js
import { createAction } from '@reduxjs/toolkit';

export const FETCH_DATA_GET_REQUEST = 'FETCH_DATA_GET_REQUEST';
export const FETCH_DATA_GET_SUCCESS = 'FETCH_DATA_GET_SUCCESS';
export const FETCH_DATA_GET_FAILURE = 'FETCH_DATA_GET_FAILURE';

export const fetchDataGetRequest = () => ({
    type: FETCH_DATA_GET_REQUEST,  
});

export const fetchDataGetSuccess = (data) => ({
    type: FETCH_DATA_GET_SUCCESS,
    payload: data,
});

export const fetchDataGetFailure = (error) => ({
    type: FETCH_DATA_GET_FAILURE,
    payload: error,
});

export const fetchDataGet = (token, url) => {
    return async (dispatch) => {
        dispatch(fetchDataGetRequest(token, url));
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });//'https://localhost:7086/account/get-current-user'
            //
            const data = await response.json();
            dispatch(fetchDataGetSuccess(data));
        } catch (error) {
            dispatch(fetchDataGetFailure(error.toString()));
        }
    };
};