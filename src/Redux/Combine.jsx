import { combineReducers } from "redux";
import Reducers from "./Reducer";
const root=combineReducers({
    items:Reducers
})
export default root;