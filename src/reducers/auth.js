import { LOGIN_SUCCESS,
        LOGIN_FAIL,
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_FETCH_REQUEST,
        USER_FETCHED, 
        AUTH_ERROR,
        LOGOUT } from '../actions/types';

const initialState = {
    token : null,
    isAuthenticated : null,
    isLoading : null,
    user : null
}
export default function(state = initialState, action) {
    switch(action.type) {
        case USER_FETCH_REQUEST :
            return {
                ...state,
                isLoading : true,
            }
        case LOGIN_SUCCESS :
            return {
                ...state, 
                isAuthenticated : true,
                isLoading : false,
                user : action.payload.user,
                token : action.payload.token
            }
        case USER_FETCHED :
            return {
                ...state, 
                isAuthenticated : true,
                isLoading : false,
                user : action.payload.message,
                token : action.payload.token
            }
        case REGISTER_SUCCESS :
            return {
                ...state,
                isAuthenticated : false,
                isLoading : false,
                user : action.payload.response
            }
        case LOGIN_FAIL :
        case REGISTER_FAIL :
        case AUTH_ERROR :
        case LOGOUT :
            localStorage.removeItem('token');
            return  {
                ...state,
                isAuthenticated: null,
                token: null,
                user : null
            }

        default : return state;

    }


}