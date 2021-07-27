import * as Action_types from '../actionType';
const initialState = {
    accessToken: sessionStorage.getItem('yt-accessToken') ? sessionStorage.getItem('yt-accessToken') : '' ,
    name: sessionStorage.getItem('yt-user-profile') ? JSON.parse(sessionStorage.getItem('yt-user-profile')).name : '',
    user_name: sessionStorage.getItem('yt-user-profile') ? JSON.parse(sessionStorage.getItem('yt-user-profile')).user_name : '',
    family_name: sessionStorage.getItem('yt-user-profile') ? JSON.parse(sessionStorage.getItem('yt-user-profile')).family_name : '',
    granted_scope: sessionStorage.getItem('yt-user-profile') ? JSON.parse(sessionStorage.getItem('yt-user-profile')).granted_scope : '',
    id: sessionStorage.getItem('yt-user-profile') ? JSON.parse(sessionStorage.getItem('yt-user-profile')).id : '',
    picture: sessionStorage.getItem('yt-user-profile') ? JSON.parse(sessionStorage.getItem('yt-user-profile')).picture : '',
    loading:false
}

export const authReducer = (state = initialState , action) => {
    
    switch(action.type){
        case Action_types.LOGIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case Action_types.LOGIN_SUCCESS:
            return{
                ...state,
                accessToken:action.payload.accessToken,
                loading:false
            }
        case Action_types.LOGIN_FAILED:
            return{
                ...state,
                accessToken:null,
                loading:false,
                error:action.payload.error
            }
        case Action_types.LOAD_PROFILE:
            return{
                ...state,
                user_name:action.payload.user_name,
                name:action.payload.name,
                family_name:action.payload.family_name,
                granted_scope: action.payload.granted_scope,
                id: action.payload.id,
                picture: action.payload.picture,
            }
        case Action_types.LOG_OUT:
            return {
                ...state,
                accessToken:"",
                user_name:"",
                name:"",
                family_name:"",
                granted_scope: "",
                id: "",
                picture: "",
            }
        default:
            return state
    }
}