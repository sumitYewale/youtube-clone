import {createStore , applyMiddleware , combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {authReducer} from '../redux/reducers/auth.reducer'
import {videoReducer} from '../redux/reducers/video.reducer'
const reducer = combineReducers({
    auth:authReducer,
    video:videoReducer
})

const store = createStore(reducer,{},composeWithDevTools(applyMiddleware(thunk)))

export default store;