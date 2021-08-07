import React from 'react'
import './_commentsData.scss';
import Comment from '../Comment/Comment';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import {getVideoCommentsByVideoId} from '../../redux/actions/comments.action'
import { useEffect } from 'react';

function CommentsData({videoId , commentCount}) {
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getVideoCommentsByVideoId(videoId))
    },[dispatch,videoId]);

    const comments = useSelector(state => state.comments.comments);
    
    const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet)
    
    const handleComment = () => {

    }

    return (
        <div className="comments">
            <p className="total__commentsCount">{ numeral(commentCount).format("0.0a") } Comments</p>
            <div className="comments__from d-flex my-2">
                <img src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg" 
                alt="" className="rounded-circle mr-3" />
                <form onSubmit={handleComment} className="">
                    <input type="text" className="flex-grow-1" placeholder="Add a public comment.." />
                    <button >Comment</button>
                </form>
            </div>

            <div className="comments__list">
                {
                   _comments?.map((comment , i) => (
                        <Comment comment={comment} key={i} />
                    ))
                }
            </div>
        </div>
    )
}

export default CommentsData
