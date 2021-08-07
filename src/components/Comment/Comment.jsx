import React from 'react'
import moment from 'moment'
import './_comment.scss'

function Comment({comment}) {
    
    const {authorDisplayName,authorProfileImageUrl,publishedAt,textDisplay} = comment;
    return (
        <div className="comment d-flex" >
            <img src={authorProfileImageUrl}  
                alt="" className="rounded-circle mr-3" />
                <div className="comment__body">
                    <p className="comment__body__header">
                        {authorDisplayName} <span>{ moment(publishedAt).fromNow() }</span>
                    </p>
                    <p className="comment__body__reply">
                        {textDisplay}
                    </p>
                </div>
        </div>
    )
}

export default Comment
