import { combineReducers } from "redux";

import { tweetsReducer } from "./ducks/tweets/reducer";
import { topicReducer } from "./ducks/actualTopics/reducer";
import { accountReducer } from "./ducks/actualAccount/reducers";
import { userReducer } from "./ducks/user/reducers";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  topics: topicReducer,
  accounts: accountReducer,
  user: userReducer,
});
