import * as Action_types from '../actionType'
import request from '../../api';


export const mostPopularVideos = (by) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:Action_types.HOME_VIDEO_REQUEST
        })

        const response = await request("/videos",{
            params:{
                part:'snippet',
                chart:'mostPopular',
                regionCode:'IN',
                pageToken:getState().video.pageToken,
                maxResults:12,
                q:'All'
            }
        })

        dispatch({
            type: Action_types.HOME_VIDEO_SUCCESS,
            payload:{
                videos:response.data.items,
                nextToken: response.data.nextPageToken,
                category:'All',
                actionFrom:by
            }
        })
    } catch(error) {
        dispatch({
            type:Action_types.HOME_VIDEO_FAIL,
            payload:error.message
        })
    }
}

export const getSearchCategoryVideos = (key) => async (dispatch, getState) =>{
    try {
        
        dispatch({
            type:Action_types.HOME_VIDEO_REQUEST
        })

        const response = await request("/search",{
            params:{
                part:'snippet',
                q:key,
                chart:'mostPopular',
                maxResults:20,
                type:'video',
                pageToken:getState().video.pageToken,
            }
        })

        dispatch({
            type: Action_types.HOME_VIDEO_SUCCESS,
            payload:{
                videos:response.data.items,
                nextToken: response.data.nextPageToken,
                category:key
            }
        })
    } catch(error) {
        dispatch({
            type:Action_types.HOME_VIDEO_FAIL,
            payload:error.message
        })
    }
}