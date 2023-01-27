import { combineReducers } from '@reduxjs/toolkit'
//import counterReducer from './counter'
import counterReducer from './counter'

const rootReducer = combineReducers({
    counter: counterReducer,
})

export default rootReducer