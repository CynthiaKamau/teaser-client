import axios from 'axios';
import AuthService from '../services/auth.service'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_FETCH_REQUEST,
    USER_FETCHED,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    LOGOUT,
    AUTH_ERROR
} from '../actions/types';

//check user and load user
export const loadUser = (dispatch, getState) => {

    //user loading
    dispatch({ type: USER_FETCH_REQUEST })

    axios.get(`/auth/profile`, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_FETCHED,
            payload: res
        })

        )
        .catch(error => dispatch({ type: AUTH_ERROR, payload: error }),
        );

}

//register
export const register = ( first_name, middle_name, last_name,email, role_id,gender, phone_number, county,sub_county, ward, constituency, landmark, terms_and_conditions, password, password_confirmation ) => (dispatch) => {

    return AuthService.register(first_name, middle_name, last_name,email, role_id,gender, phone_number, county,sub_county, ward, constituency, landmark, terms_and_conditions, password, password_confirmation)
    .then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response
            });
            return response;
        },
        (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            dispatch({
              type: REGISTER_FAIL, payload: message
            });
            return error;
        }
    )
}

//login
export const login = ( email, password ) => (dispatch) => {

    return AuthService.login(email, password).then(
        (response) => {
            dispatch({
                type: LOGIN_SUCCESS, payload: response
            });
            return response;
        },
        (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            dispatch({
              type: LOGIN_FAIL, payload: message
            });
            return error;
        }
    )

}

//update profile
export const update_profile = ({id, first_name, middle_name, last_name, phone_number, email}) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({id,first_name, middle_name, last_name, phone_number, email});

    axios.post('/auth/update-profile', body, config)
        .then(res => dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.data
        }))
        .catch(error => dispatch({ type: UPDATE_USER_FAIL, payload: error}),
        );
}

//logout
export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const tokenConfig = getState => {

    //get token from local storage
    const token = getState().auth.token;

    //headers
    let config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //if token add to headers
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;

}

