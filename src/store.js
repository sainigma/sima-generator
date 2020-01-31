import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import projectReducer from './reducers/projectReducer'
import projectsReducer from './reducers/projectsReducer'

const reducer = combineReducers({
  currentProject: projectReducer,
  projects: projectsReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store