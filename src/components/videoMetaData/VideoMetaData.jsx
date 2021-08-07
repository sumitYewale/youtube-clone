import React, { useEffect } from 'react'
import './_videometadata.scss'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import ReactShowMoreText from 'react-show-more-text'
import moment from 'moment'
import numeral from 'numeral'

import {useDispatch, useSelector} from 'react-redux'
import {getChannelDetails} from '../../redux/actions/channel.action'

function VideoMetaData({ videoSnippet }) {
    const dispatch = useDispatch();

    const { snippet, statistics } = videoSnippet[0];

    const { snippet:channelSnippet, statistics:channelStatistics } = useSelector(state => state.channelDetails.channel);
    
    useEffect(()=>{
        dispatch(getChannelDetails(videoSnippet[0].snippet.channelId))   
    },[dispatch,videoSnippet])
    return (
        <div className="videoM">
            <div className="videoM__title">
                <p>{snippet.title}</p>
            </div>
            <div className="videoM__otherDetails">
                <div className="statisticsDetails">
                    <div className="statistics__viewCount">
                        <span className="text-uppercase">
                        {
                            numeral(statistics.viewCount).format('0.0a')
                        }
                        </span>  Views
                    </div>
                    <span className="divider" ></span>
                    <div className="statistics__postedDate">
                        {
                            moment.utc(snippet.publishedAt).format("DD MMM YYYY")
                        }
                    </div>
                </div>

                <div className="activityContainer">
                    <div className="like__container">
                        <button>
                            <MdThumbUp size={25} />
                            <span className="text-uppercase">
                                {numeral(statistics.likeCount).format('0.0a')}
                            </span>
                        </button>
                    </div>
                    <div className="dislike__container">
                        <button>
                            <MdThumbDown size={25} />
                            <span className="text-uppercase">
                                {numeral(statistics.dislikeCount).format('0.0a')}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="videoM__channelDetails">
                <div className="channel__subscribeButton">
                    <div className="channelIconandName">
                        <div className="channelDetails">
                            <div className="channelIcon">
                                <img src=
                                    {channelSnippet !== undefined
                                        ? channelSnippet?.thumbnails?.medium?.url
                                        : "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg"}
                                    alt="" />

                            </div>
                            <div className="channelNameSubDetails">
                                <p className="channelHeading" >
                                    {channelSnippet?.title}
                                </p>
                                <p className="subscriberCount" >
                                    <span className="text-uppercase" >
                                        {numeral(channelStatistics?.subscriberCount).format("0.0a") } 
                                    </span>
                                    subscribers</p>
                            </div>

                        </div>
                        <div className="channelName">

                            <div className="channel_description">
                                <ReactShowMoreText
                                    lines={3}
                                    more="Show More"
                                    less="Show Less"
                                    anchorClass="show_more_click"
                                    expanded={false}>
                                    {snippet.description}
                                </ReactShowMoreText>

                            </div>
                        </div>
                    </div>
                    <div className="subscribeButtonContainer">
                        {<button>
                            Subscribe
                        </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}


export default VideoMetaData
