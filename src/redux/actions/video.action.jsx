import * as Action_types from '../actionType'
import request from '../../api';


export const mostPopularVideos = (token) => async (dispatch) => {
    try {
        if (sessionStorage.getItem('fetch-youtube') === 'false' || sessionStorage.getItem('fetch-youtube') === null) {
            dispatch({
                type: Action_types.HOME_VIDEO_REQUEST
            })

            const response = await request("/videos", {
                params: {
                    part: 'snippet',
                    chart: 'mostPopular',
                    regionCode: 'IN',
                    pageToken: token,
                    maxResults: 10
                }
            })

            dispatch({
                type: Action_types.HOME_VIDEO_SUCCESS,
                payload: {
                    videos: response.data.items,
                    nextToken: response.data.nextPageToken,
                    category: 'All'
                }
            })

            if (response.data !== "") {
                sessionStorage.setItem('fetch-youtube', true);
                sessionStorage.setItem('youtube-data', JSON.stringify(response));
            }
        }
        else {
            dispatch({
                type: Action_types.HOME_VIDEO_SUCCESS,
                payload: {
                    videos: JSON.parse(sessionStorage.getItem('youtube-data')).data.items,
                    nextToken: JSON.parse(sessionStorage.getItem('youtube-data')).data.nextPageToken,
                    category: 'All'
                }
            })
        }
    } catch (error) {
        dispatch({
            type: Action_types.HOME_VIDEO_FAIL,
            payload: error.message
        })
    }
}

export const getSearchCategoryVideos = (key) => async (dispatch, getState) => {
    try {

        dispatch({
            type: Action_types.HOME_VIDEO_REQUEST
        })

        const response = await request("/search", {
            params: {
                part: 'snippet',
                q: key,
                chart: 'mostPopular',
                maxResults: 10,
                type: 'video',
                pageToken: getState().video.pageToken,
            }
        })

        dispatch({
            type: Action_types.HOME_VIDEO_SUCCESS,
            payload: {
                videos: response.data.items,
                nextToken: response.data.nextPageToken,
                category: key
            }
        })
    } catch (error) {
        dispatch({
            type: Action_types.HOME_VIDEO_FAIL,
            payload: error.message
        })
    }
}

export const getSelectedVideoDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: Action_types.SELECTED_VIDEO_REQUEST,
            payload: true
        })

        const response = await request('/videos', {
            params: {
                part: 'statistics,snippet',
                id: id
            }
        })

        dispatch({
            type: Action_types.SELECTED_VIDEO_SUCCESS,
            payload: response.data.items
        })
    }
    catch (error) {
        dispatch({
            type: Action_types.SELECTED_VIDEO_FAIL,
            payload: error.message
        })
    }
}

export const getrelatedVideos = (id) => async (dispatch) => {
    try {
        dispatch({
            type: Action_types.RELATED_VIDEO_REQUEST,
            payload: true
        })

        const {data} = await request('/search', {
            params: {
                part: 'snippet',
                relatedToVideoId:id,
                maxResults:15,
                type:'video',
            }
        })

        dispatch({
            type: Action_types.RELATED_VIDEO_SUCCESS,
            payload: data.items
        })
    }
    catch (error) {
        dispatch({
            type: Action_types.RELATED_VIDEO_FAIL,
            payload: error.message
        })
    }
}

export const getSearchByKeyword = (keyword) => async (dispatch) => {
    try {

        dispatch({
            type: Action_types.SEARCH_VIDEO_REQUEST
        })

        const response = await request("/search", {
            params: {
                part: 'snippet',
                q: keyword,
                maxResults: 10,
                type: 'video',
            }
        })

        dispatch({
            type: Action_types.SEARCH_VIDEO_SUCCESS,
            payload: {
                videos: response.data.items,
                nextToken: response.data.nextPageToken,
                category: keyword
            }
        })
    } catch (error) {
        dispatch({
            type: Action_types.SEARCH_VIDEO_FAIL,
            payload: error.message
        })
    }
}