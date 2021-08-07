import * as Action_type from '../actionType'
export const commentsReducer =(state={ loading: true, comments:null, error: '' } , action) => {
    switch(action.type){
        case Action_type.SELECTED_COMMENTS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case Action_type.SELECTED_COMMENTS_SUCCESS:
            return{
                ...state,
                comments: action.payload,
                loading:false
            }
        case Action_type.SELECTED_COMMENTS_FAIL:
            return{
                ...state,
                loading:false,
                comments:null,
                error:action.payload 
            }
        default:
            return state
    }
}