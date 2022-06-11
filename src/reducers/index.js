import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import auth from './auth';
import post from './post';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'item']
}

const rootReducer = combineReducers({
    auth : auth,
    post : post
})

export default persistReducer(persistConfig, rootReducer);