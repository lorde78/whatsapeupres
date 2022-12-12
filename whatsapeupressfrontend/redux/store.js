import { createStore, applyMiddleware, combineReducers } from 'redux'
import rootReducer from './reducers/reducer'
import chatBoxReducer from './reducers/ChatBox'
import authReducer from './reducers/auth'
import thunk from 'redux-thunk'



const reducers = combineReducers({
    rootReducer,
    chatBoxReducer,
    authReducer,
  });
  
function logger({ getState }) {
    return (next) => (action) => {
      console.log('will dispatch', action)
      return next(action)
    }
  }

const store = createStore(reducers, applyMiddleware(thunk.withExtraArgument(logger)))

export default store