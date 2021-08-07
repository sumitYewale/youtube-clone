import React, { useEffect, useState } from 'react'
import './_horizontalVideoComponent.scss'
import { useDispatch, useSelector } from 'react-redux'
// import {AiFillEye} from 'react-icons/ai'
// import request from '../../api'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import request from '../../api';
import { useHistory } from 'react-router-dom'
import { Badge } from 'react-bootstrap'

const HorizontalVideoComponent = ({ data, searchScreen }) => {

    const dispatch = useDispatch();
    const [videoData, setVideoData] = useState([]);
    const [channelDetails, setChannelDetails] = useState([]);
    const history = useHistory();

    const {
        id: {
            videoId,
            kind
        },
        snippet: {
            publishedAt,
            title,
            channelId,
            channelTitle,
            thumbnails,
            description,
            liveBroadcastContent,
        }
    } = data ?? null;

    useEffect(() => {
        const getVideoDetails = async () => {
            try {
                const { data: { items } } = await request.get('/videos', {
                    params: {
                        part: "contentDetails,statistics",
                        id: videoId
                    }
                })

                setVideoData(items);

            } catch (error) {
                console.log(error.message)
            }
        }
        getVideoDetails()
    }, [dispatch, videoId]);

    useEffect(() => {
        const getChannelDetails = async () => {
            try {
                const { data: { items: channelDetails } } = await request.get('/channels', {
                    params: {
                        part: 'snippet,contentDetails',
                        id: channelId
                    }
                })
                setChannelDetails(channelDetails);

            } catch (error) {
                console.log(error.message);
            }
        }

        getChannelDetails();
    }, [channelId]);

    const redirectClick = () => {
        history.push(`/watch/${videoData?.[0]?.id}`)
    }

    const isVideo = "";

    const _seconds = moment.duration(videoData?.[0]?.contentDetails?.duration).asSeconds();
    const _duration = moment.utc(_seconds * 1000).format("mm:ss")

    return (
        <div className="Hvideo" >
            <div className="Hvideo__container">
                <div className={searchScreen ? 'videoSearch__thumbnail' : 'video__thumbnail'}>
                    <LazyLoadImage src={thumbnails?.medium?.url} alt="" effect="blur" onClick={redirectClick} />

                    <div className="video__duration">

                        {
                            (liveBroadcastContent === "none") ?
                                _duration
                                :
                                <Badge bg="danger" className="danger" >
                                    Upcoming
                                </Badge>
                        }
                    </div>

                </div>
                <div className={searchScreen ? 'searchVideo__details' : 'video__details'} >
                    <div className={searchScreen ? 'videoSearch__title common__title' : 'video__title common__title'}>
                        <p onClick={redirectClick}>{title}</p>
                    </div>
                    <div className={searchScreen ? 'channelSearch__title commonSearch__title' : 'channel__title commonSearch__tile'}>
                        {

                            <div className="searchChannel__icon" >
                                <img src={channelDetails?.[0]?.snippet?.thumbnails?.medium?.url} alt="" />
                            </div>

                        }
                        <p>{channelTitle}</p>
                    </div>
                    <div className={searchScreen ? 'searchVideo__statisticDetails commonStatistics__details' : 'video__statisticDetails commonStatistics__details'}>
                        {
                            (liveBroadcastContent === "none") ?
                                <p >
                                    <span className="text-uppercase" >
                                        {numeral(videoData?.[0]?.statistics?.viewCount).format('0.a')}
                                    </span> Views
                                </p>
                                :
                                <Badge bg="success" >
                                    Upcomming
                                </Badge>
                        }

                        <span>
                            •
                        </span>

                        <p>{moment(publishedAt).fromNow()}</p>

                    </div>

                    {searchScreen ?
                        <div className="video__description">
                            {
                                description
                            }
                        </div>
                        : ''
                    }

                </div>

            </div>
        </div>
    )
}

export default HorizontalVideoComponent
