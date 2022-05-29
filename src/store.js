import rootReducer from "./rootReducer";
import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'authType',
    storage: storage,
    whitelist: ['signupReducer','userReducer'] // which reducer want to store
  };
  const pReducer = persistReducer(persistConfig, rootReducer);
  const logger=createLogger()
  const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);


const persistor = persistStore(store);
export { persistor, store };