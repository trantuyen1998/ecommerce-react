import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

import storage from 'redux-persist/lib/storage';//get localstorage
import { persistReducer } from 'redux-persist';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// persist config

const persistConfig = {
    key:'root',
    storage,
    whitelist:['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})
export default persistReducer(persistConfig, rootReducer);