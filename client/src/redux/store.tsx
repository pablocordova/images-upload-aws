import thunk from "redux-thunk"
import authReducer from "./auth"
import imagesReducer from "./images"

import { applyMiddleware, combineReducers, compose, createStore } from "redux"

const rootReducer = combineReducers({
    auth: authReducer,
    images: imagesReducer
})

export default function generateStore() {
    return createStore(rootReducer, compose(applyMiddleware(thunk)))
}

export type RootState = ReturnType<typeof rootReducer>