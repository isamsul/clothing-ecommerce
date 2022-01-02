import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlwares = [];

if (process.env.NODE_ENV === "development") {
  middlwares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlwares));

const persistor = persistStore(store);

export { store, persistor };
