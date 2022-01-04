import rootReducer from "./rootReducer";
import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger=createLogger()

export const store=createStore(rootReducer,applyMiddleware(thunk,logger))