import React from 'react'
import { useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import HorizontalVideoComponent from '../../components/HorizontalVideoComponent/HorizontalVideoComponent';
import { getSearchByKeyword } from '../../redux/actions/video.action';

import './_searchScreen.scss'

function SearchScreen() {

    const dispatch = useDispatch();
    const { query } = useParams();

    useEffect(() => {
        dispatch(getSearchByKeyword(query))
    }, [dispatch, query]);

    const { video, loading } = useSelector(state => state.searchVideoByKeyword);

    return (
        <div className="searchVideoContainer" >
            {
                !loading
                    ?
                    video?.videos?.map((value, i) => (
                        <HorizontalVideoComponent data={value} key={i} searchScreen />
                    ))
                    :
                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                        <Skeleton width="100%" height={200} count={15} />
                    </SkeletonTheme>
            }
        </div>
    )
}

export default SearchScreen
