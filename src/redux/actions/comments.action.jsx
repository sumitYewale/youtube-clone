import * as Action_types from '../actionType'
import request from '../../api'

export const getVideoCommentsByVideoId = (id) => async (dispatch) => {
    try {
        dispatch({
            type: Action_types.SELECTED_COMMENTS_REQUEST,
            loading:true
        })
    
        const {data} = await request('/commentThreads',{
            params:{
                part:'snippet',
                videoId: id
            }
        })
    
        dispatch({
            type: Action_types.SELECTED_COMMENTS_SUCCESS,
            payload: data.items
        })
    } catch (error) {
        dispatch({
            type: Action_types.SELECTED_COMMENTS_FAIL,
            payload: error.message
        })
    }
}