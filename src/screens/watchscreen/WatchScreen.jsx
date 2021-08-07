import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import VideoMetaData from '../../components/videoMetaData/VideoMetaData'
import CommentsData from '../../components/CommentsData/CommentsData'
import HorizontalVideoComponent from '../../components/HorizontalVideoComponent/HorizontalVideoComponent'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { getSelectedVideoDetails, getrelatedVideos } from '../../redux/actions/video.action'

import { useDispatch, useSelector } from 'react-redux'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


function WatchScreen() {

    const id = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedVideoDetails(id.id))
    }, [dispatch, id.id])

    const { video, loading } = useSelector(state => state.selectedVideo)

    useEffect(() => {
        dispatch(getrelatedVideos(id.id))
    }, [dispatch, id.id]);

    const { loading: relatedVideoLoading, video: relatedVideo } = useSelector(state => state.relatedVideos);


    return (
        <div className="player" >
            <Container fluid >
                <Row>
                    <Col lg={8} md={7} xs={12}>
                        <div className="player__container">
                            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id.id}?autoplay=0&showinfo=0&iv_load_policy=0&rel=0`}
                                title={video?.snippet?.title}
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                        </div>
                        {
                            (!loading && Object.keys(video).length !== 0)
                                ? <VideoMetaData videoSnippet={video} />
                                :
                                <div style={{ marginTop: 20 }}>
                                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                                        <Skeleton width="100%" height={20} count="1" />
                                        <Skeleton width="100%" height={20} count="1" style={{ marginTop: 10 }} />
                                    </SkeletonTheme>
                                </div>
                        }

                        <CommentsData videoId={id.id} commentCount={video?.[0]?.statistics?.commentCount} />
                    </Col>

                    <Col lg={4} md={5} xs={12}>
                        {
                            (!relatedVideoLoading)
                                ?
                                relatedVideo?.filter(video => video?.snippet)
                                    .map((video, i) => (
                                        <HorizontalVideoComponent data={video} key={i} />
                                    ))
                                : 
                                <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                                    <Skeleton width="100%" height={100} count={15} />
                                </SkeletonTheme>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default React.memo(WatchScreen)
