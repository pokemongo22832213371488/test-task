import { combineReducers } from 'redux'
import { crudReducer } from './crudReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    crud: crudReducer,
    user: userReducer,
})