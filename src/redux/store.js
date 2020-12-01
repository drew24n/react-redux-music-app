import {applyMiddleware, compose, createStore} from "redux";
import {musicReducer} from "./musicReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(musicReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))