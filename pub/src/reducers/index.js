import { combineReducers} from "@reduxjs/toolkit";
import loader from 'reducers/loader'
import notification from 'reducers/notification'

export default combineReducers({
    loader,
    notification
})