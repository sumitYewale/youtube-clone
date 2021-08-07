import * as Action_types from '../actionType'

export const channelDetailsReducer =(
    state = {channelLoading: true , channel:[] , error: ''}, 
    action) =>{
    switch(action.type){
        case Action_types.SELECTED_CHANNEL_REQUEST:
            return{
                ...state,
                channelLoading:true,
            }
        case Action_types.SELECTED_CHANNEL_SUCCESS:
            return{
                ...state,
                channelLoading:false,
                channel:action.payload,
            }
        case Action_types.SELECTED_CHANNEL_FAIL:
            return{
                ...state,
                channelLoading:false,
                error:action.payload,
                channel:null
            }
        default:
            return state
    }
}