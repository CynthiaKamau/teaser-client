import {
    POST_SUCCESS,
    POST_FETCH_REQUEST,
    POST_FAIL,

    POSTS_SUCCESS,
    POSTS_FETCH_REQUEST,
    POSTS_FAIL, 
    POST_EDIT_SUCCESS,
    POST_EDIT_FAIL} from '../actions/types';

const initialState = {
    posts : [],
    posts_error: [],
    post: [],
    post_error: [],
    isLoading : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case POSTS_FETCH_REQUEST :
        case POST_FETCH_REQUEST :
            return {
                ...state,
                isLoading: true
            }

        case POST_SUCCESS :
        case POST_EDIT_SUCCESS :    
            return {
                ...state,
                post : action.payload.message,
                isLoading : false
            }

        case POSTS_SUCCESS :
            return {
                ...state,
                posts : action.payload.message,
                isLoading : false
            }

        case POST_FAIL :
        case POST_EDIT_FAIL :
            return {
                ...state,
                isLoading: false,
                post : null,
                post_error : action.payload
            }

        case POSTS_FAIL :
            return {
                ...state,
                isLoading: false,
                posts : null,
                posts_error : action.payload
            }
        
        default : return state;
    }
}