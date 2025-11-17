
import { applyMiddleware,legacy_createStore} from "redux";
import {thunk} from 'redux-thunk'
// import root from "./CombineReducer";
import root  from "./Combine";
const store=legacy_createStore(root,applyMiddleware(thunk))
export default store;