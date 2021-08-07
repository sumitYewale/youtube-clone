import React from 'react'


import { AiFillClockCircle, AiFillYoutube } from 'react-icons/ai'
import { MdSubscriptions, MdPlayArrow, MdExplore, MdExitToApp, MdThumbUp, MdHistory, MdVideoLibrary, MdSentimentDissatisfied, MdHome } from 'react-icons/md';
import { IoMdFilm } from 'react-icons/io';
import { SiYoutubegaming } from 'react-icons/si';
import { RiBroadcastFill } from 'react-icons/ri'
import { GiHanger } from 'react-icons/gi'
import { Link } from 'react-router-dom';

import {logout} from '../../redux/actions/auth.action'
import { useDispatch } from 'react-redux';

function Sidebar({ sidebarStatus, toggleSidebar }) {

    const dispatch = useDispatch();
    const logoutHandler = () =>{
        dispatch(logout())
    }

    return (
        <nav className={sidebarStatus ? "sidebar active" : "sidebar"} onClick={ () => {toggleSidebar()}} >
            <div className="sidebar__navContainer">
                <li className="active" title="Home" >
                    <Link to="/">
                        <MdHome size={23} />
                        <span data-tip="Home" >Home</span>
                    </Link>
                </li>
                <li title="Explore">
                    <MdExplore size={23} />
                    <span>Explore</span>
                </li>
                <li title="Subscriptions">
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </li>
            </div>
            <div className="sidebar__navContainer">
                <li title="Library">
                    <MdVideoLibrary size={23} />
                    <span>Library</span>
                </li>
                <li title="History">
                    <MdHistory size={23} />
                    <span>History</span>
                </li>
                <li title="Your videos">
                    <MdPlayArrow size={23} />
                    <span>Your videos </span>
                </li>
                <li title="Watch Later">
                    <AiFillClockCircle size={23} />
                    <span>Watch Later </span>
                </li>
                <li title="Liked videos">
                    <MdThumbUp size={23} />
                    <span>Liked videos </span>
                </li>
                <li title="Unliked videos">
                    <MdSentimentDissatisfied size={23} />
                    <span>Unliked videos</span>
                </li>
            </div>

            <div className="sidebar__navContainer">
                <h5>More from youtube</h5>
                <li title="Youtube premium">
                    <AiFillYoutube size={23} />
                    <span>Youtube premium </span>
                </li>
                <li title="Films">
                    <IoMdFilm size={23} />
                    <span>Films </span>
                </li>
                <li title="Gaming">
                    <SiYoutubegaming size={23} />
                    <span>Gaming</span>
                </li>
                <li title="Live">
                    <RiBroadcastFill size={23} />
                    <span>Live</span>
                </li>
                <li title="Fashion & Beauty">
                    <GiHanger size={23} />
                    <span>Fashion & Beauty</span>
                </li>
                <li title="Exit" onClick={logoutHandler} >
                    <MdExitToApp size={23} />
                    <span>Exit</span>
                </li>
            </div>


        </nav>
    )
}

export default React.memo(Sidebar)
