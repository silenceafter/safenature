// actions/userActions.js
import { createAction } from '@reduxjs/toolkit';

export const fetchUserDataRequest = createAction('FETCH_USER_DATA_REQUEST');
export const fetchUserDataSuccess = createAction('FETCH_USER_DATA_SUCCESS');
export const fetchUserDataFailure = createAction('FETCH_USER_DATA_FAILURE');

export const fetchUserData = (token) => async (dispatch) => {
    dispatch(fetchUserDataRequest());
    try {
        const response = await fetch('https://localhost:7086/account/get-current-user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(fetchUserDataSuccess(data));
        } else {
            dispatch(fetchUserDataFailure('Failed to fetch user data'));
        }
    } catch (error) {
        dispatch(fetchUserDataFailure(error.toString()));
    }
};