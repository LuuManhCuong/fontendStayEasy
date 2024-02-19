import { applyMiddleware, combineReducers, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import propertyReducer from './reducers/PropertyReducer';
const rootReducer = combineReducers({
    propertyReducer,
})
export const store = createStore(rootReducer,applyMiddleware(thunk));