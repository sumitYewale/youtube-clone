import React from 'react'
import './_video.scss'

//import { FaCheck } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import request from '../../api'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Video({ video }) {
    
    const [view, setView] = useState('');
    const [duration, setDuration] = useState('');
    const [channelThumbnail, setChannelThumbnail] = useState("");

    const history = useHistory();

    useEffect(() => {
        try {
            const getVideoStaticticsandCOntentDetails = async () => {
                try {
                    const { data: { items } } = await request.get('/videos', {
                        params: {
                            part: 'contentDetails,statistics',
                            id: typeof video.id == "string" ? video.id : video.id.videoId
                        }
                    })
                    
                    const seconds = moment.duration(items[0].contentDetails.duration).asSeconds();
                    const _duration = moment.utc(seconds * 1000).format("mm:ss")
                    setDuration(_duration);
                    setView(items[0].statistics.viewCount);
                } catch (error) {
                    console.log(error.message);
                }
            }
            getVideoStaticticsandCOntentDetails()
        } catch (error) {
            console.log(error.message);
        }
       
    }, [video.id , view ,duration])

    const videoClickHandler = () => {
        const id = typeof video.id == "string" ? video.id : video.id.videoId
        history.push(`/watch/${id}`)
    }

    useEffect(() => {
        const ac = new AbortController();
        try {
            const getChannelIcon = async () => {
                try {
                    const { data: { items } } = await request.get("/channels", {
                        params: {
                            part: "snippet,status",
                            id: video.snippet.channelId
                        }
                    })
                    setChannelThumbnail(items[0].snippet.thumbnails.medium.url);    
                } catch (error) {
                    console.log(error.message)
                }  
            }
            getChannelIcon()
        } catch (error) {
            console.log(error.message)
        }
        return(()=>{
            ac.abort();
        })
    }, [video.snippet.channelId ,channelThumbnail]);

    

    return (
        <div className="video"  onClick={videoClickHandler} >
            <div className="video__store">
                <div className="video__thumbnailStore" >
                    <div className="thumbnail__container">
                        <div className="thumbnail__show">
                            <Link to="">
                                <div>
                                <LazyLoadImage src={video.snippet.thumbnails.medium.url} alt="" effect="blur" />
                                </div>
                            </Link>
                        </div>
                        <div className="video__duration">
                            {duration}
                        </div>
                    </div>
                </div>
                <div className="video__title">
                    <div className="channel__thumbnail">
                        <Link to="">
                            <LazyLoadImage src={channelThumbnail} alt="" effect="blur" />
                        </Link>
                    </div>
                    <div className="title">
                        <Link to="">
                            <b>{video.snippet.title}</b>
                        </Link>

                        <div className="video__channelName">
                            <Link to="">
                                <p>{video.snippet.channelTitle}</p>
                            </Link>

                        </div>
                        <div className="video__channelDetails">
                            <p className="views" >{numeral(view).format('0.a').toLocaleUpperCase()} Views</p>
                            <span></span>
                            <p className="timestamp">{moment(video.snippet.publishedAt).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video
