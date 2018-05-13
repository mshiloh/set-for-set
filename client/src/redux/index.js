import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import cards from "./cards.js";
import user from "./auth.js";

const reducer = combineReducers({
    cards,
    user
});

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);