import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cardsReducer from "./cards.js";

const store = createStore(combineReducers({ cards: cardsReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export default store;