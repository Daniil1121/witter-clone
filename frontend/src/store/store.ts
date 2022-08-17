import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { ITweetsState } from "./ducks/tweets/contracts/state";
import { ITopicState } from "./ducks/actualTopics/contracts/state";
import { IActualAccountState } from "./ducks/actualAccount/state";
import { IUserState } from "./ducks/user/state";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface IRootState {
  tweets: ITweetsState;
  topics: ITopicState;
  accounts: IActualAccountState;
  user: IUserState;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
