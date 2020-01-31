import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import projectsReducer from './reducers/projectsReducer'

const reducer = combineReducers({
  projects: projectsReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store