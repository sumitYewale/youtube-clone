import * as Action_types from '../actionType'

const initialState = {
    videos:[],
    loading:false,
    nextPageToken:'',
    category:'',
    stateCategory:'',
    actionFrom:''
};
export const videoReducer =(state = initialState , action) => {
    switch(action.type){
        case Action_types.HOME_VIDEO_REQUEST:
            return{
                loading:true
            }
        case Action_types.HOME_VIDEO_SUCCESS:
            return{
                ...state,
                videos: state.category === action.payload.category  
                ? [...state.videos, ...action.payload.videos ]
                : action.payload.videos
                ,
                pageToken:action.payload.nextToken,
                stateCategory:state.category,
                category:action.payload.category,
                loading:false,
                actionFrom:action.payload.actionFrom
            }
        case Action_types.HOME_VIDEO_FAIL:
            return{
                ...state,
                payload:action.payload
            }
        default:
            return state
    }

}