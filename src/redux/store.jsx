import {createStore , applyMiddleware , combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {authReducer} from '../redux/reducers/auth.reducer'
import {videoReducer , selectedVideoReducer , relatedVideoReducer , searchVideoByKeyword } from '../redux/reducers/video.reducer'
import {channelDetailsReducer } from '../redux/reducers/channel.reducer'
import {commentsReducer } from '../redux/reducers/comments.reducer'

const reducer = combineReducers({
    auth:authReducer,
    video:videoReducer,
    selectedVideo:selectedVideoReducer,
    channelDetails: channelDetailsReducer,
    comments: commentsReducer,
    relatedVideos: relatedVideoReducer,
    searchVideoByKeyword: searchVideoByKeyword
})

const store = createStore(reducer,{},composeWithDevTools(applyMiddleware(thunk)))

export default store;