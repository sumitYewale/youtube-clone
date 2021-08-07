import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CategoriesBar from '../../components/CategoriesBar/CategoriesBar'
import Video from '../../components/Video/Video'
import Skeletons from '../../components/Skeletons/Skeletons'

import { mostPopularVideos , getSearchCategoryVideos } from '../../redux/actions/video.action'
import InfiniteScroll from 'react-infinite-scroll-component'

function HomeScreen() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(mostPopularVideos());
    }, [dispatch]);

    const authState = useSelector(state => state.auth);
    useEffect(() => {
        if (!authState.accessToken) {
            history.push("/login");
        }
    }, [authState.accessToken, history]);

    const videoState = useSelector(state => state.video);

    const fetchData = () => {
        sessionStorage.setItem('fetch-youtube',false)
        if(videoState.category === "All"){
            dispatch(mostPopularVideos(videoState.pageToken));
        }
        else{
            dispatch(getSearchCategoryVideos(videoState.category));
        }
    }

    
    return (
        <>
            <div className="category_trackContainer">
                <div className="category_container">
                    <CategoriesBar />
                </div>
            </div>
            <div className="video__collectionParent">
                <Container fluid>
                    <InfiniteScroll
                        dataLength={videoState.videos.length}
                        next={fetchData} 
                        hasMore={true}
                        loader={
                            [...Array(20)].map((value , index) => (
                                <Col xl={3} lg={4} md={6} sm={6} xs={12} key={index} >
                                    <Skeletons />
                                </Col>
                            ))
                        }
                        className="row"
                    >
                        {
                            videoState.videos.map((value, index) => (
                                <Col xl={3} lg={4} md={6} sm={6} xs={12} key={index} >
                                    <Video video={value} />
                                </Col>
                            ))
                        }
                    </InfiniteScroll>
                </Container>
            </div>
        </>
    )
}

export default HomeScreen
