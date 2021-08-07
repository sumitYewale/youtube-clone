import * as Action_types from '../actionType';
import request from '../../api';

export const getChannelDetails =(channelId) => async (dispatch) => {
    try {
        dispatch({
            type: Action_types.SELECTED_CHANNEL_REQUEST,
            payload:true
        })

        const {data} = await request.get('/channels',{
            params:{
                part:"snippet,statistics",
                id : channelId
            }
        })

        dispatch({
            type: Action_types.SELECTED_CHANNEL_SUCCESS,
            payload: data.items[0]
        })
    } catch (error) {
        dispatch({
            type: Action_types.SELECTED_CHANNEL_REQUEST,
            payload:error.message
        })
    }
}