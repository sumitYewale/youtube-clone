import * as Action_types from '../actionType'

const initialState = {
    videos:[],
    loading:false,
    nextPageToken:'',
    category:''
};

export const videoReducer =(state = initialState , action) => {
    switch(action.type){
        case Action_types.HOME_VIDEO_REQUEST:
            return{
                ...state,
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
                category:action.payload.category,
                loading:false
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

export const selectedVideoReducer = (state ={loading: true,video: [] , error:''} , action) => {
    switch(action.type){
        case Action_types.SELECTED_VIDEO_REQUEST:
            return{
                ...state,
                loading:true,
                error:'',
                video:[]
            }
        case Action_types.SELECTED_VIDEO_SUCCESS:
            return{
                ...state,
                loading:false,
                video:action.payload,
                error:''
            }
        case Action_types.SELECTED_VIDEO_FAIL:
            return{
                ...state,
                loading:false,
                video:[],
                error:action.payload
            }
        default:
            return state
    }
}   

export const relatedVideoReducer = ( state ={loading:true, video:null ,error:null} ,action) => {

    switch(action.type){
        case Action_types.RELATED_VIDEO_REQUEST:
            return{
                ...state,
                loading:true
            }
        case Action_types.RELATED_VIDEO_SUCCESS:
            return{
                ...state,
                loading:false,
                video: action.payload
            }
        case Action_types.RELATED_VIDEO_FAIL:
            return{
                ...state,
                loading:false,
                video:null,
                error:action.payload
            }
        default:
            return state
    }
}

export const searchVideoByKeyword = ( state = {loading:true , video:null , error:''} ,action ) =>{

    switch(action.type){
        case Action_types.SEARCH_VIDEO_REQUEST:
            return{
                ...state,
                loading:true
            }
        case Action_types.SEARCH_VIDEO_SUCCESS:
            return{
                ...state,
                loading:false,
                video:action.payload
            }
        case Action_types.SEARCH_VIDEO_FAIL:
            return{
                loading:false,
                video:null,
                error:action.payload
            }
        default:
            return state
    }
}