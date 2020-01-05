import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

import storage from 'redux-persist/lib/storage';//get localstorage
import { persistReducer } from 'redux-persist';

// persist config

const persistConfig = {
    key:'root',
    storage,
    whitelist:['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})
export default persistReducer(persistConfig, rootReducer);