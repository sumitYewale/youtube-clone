import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CategoriesBar from '../../components/CategoriesBar/CategoriesBar'
import Video from '../../components/Video/Video'

import { mostPopularVideos } from '../../redux/actions/video.action'
import InfiniteScroll from 'react-infinite-scroll-component'
function HomeScreen() {

    const authState = useSelector(state => state.auth);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(mostPopularVideos('via effect'));
    }, [dispatch]);

    useEffect(() => {
        if (!authState.accessToken) {
            history.push("/login");
        }
    }, [authState.accessToken, history]);

    const videoState = useSelector(state => state.video);

    const fetchData = () => {
        dispatch(mostPopularVideos('via fetchdata'));
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
                        dataLength={
                            (!videoState.loading && videoState.videos.length !== 0) 
                            ? videoState.videos.length : 10}
                        next={fetchData} hasMore={true}
                        loader={
                            <div className="spinner-border mx-auto text-danger d-block" ></div>
                        }
                        className="row"
                    >
                        {/* <Row> */}
                        {
                            

                            (!videoState.loading && videoState.videos.length !== 0) ?
                                videoState.videos.map((value, index) => (
                                    <Col xl={3} lg={4} md={6} sm={6} xs={12} key={index} >
                                        <Video video={value} />
                                    </Col>
                                ))
                                : console.log("error found")
                        }
                        {/* </Row> */}
                    </InfiniteScroll>
                </Container>
            </div>
        </>
    )
}

export default HomeScreen
