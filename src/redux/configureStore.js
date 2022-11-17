import {applyMiddleware, combineReducers, createStore} from "redux";
import {newsReduser} from "./features/news";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {createLogger} from "redux-logger/src";
import { newsCurrentReduser } from "./features/newsCurrent";

const logger  = createLogger({
    diff: true,
    collapsed: true
})

export const store = createStore(
    combineReducers({
        news: newsReduser,
        commentsNews: newsCurrentReduser,
    }), composeWithDevTools(
        applyMiddleware( thunk, logger)
    )
)