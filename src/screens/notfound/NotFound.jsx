import React from 'react'
import './_notfound.scss';

function NotFound() {
    return (
        <div className="notfound">
            <div className="notfound__container">
                <img src="https://moviemaker.minitool.com/images/uploads/articles/2020/08/youtube-video-not-available/youtube-video-not-available-1.png" alt="" />
                <button>Retry</button>
            </div>
        </div>
    )
}

export default NotFound
