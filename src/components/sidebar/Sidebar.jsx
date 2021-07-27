import React from 'react'
import './_sidebar.scss'

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
        <nav className={sidebarStatus ? "sidebar active" : "sidebar"} onClick={toggleSidebar} >
            <div className="sidebar__navContainer">
                <li className="active" >
                    <Link to="/">
                        <MdHome size={23} />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <MdExplore size={23} />
                    <span>Explore</span>
                </li>
                <li>
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </li>
            </div>
            <div className="sidebar__navContainer">
                <li>
                    <MdVideoLibrary size={23} />
                    <span>Library</span>
                </li>
                <li>
                    <MdHistory size={23} />
                    <span>History</span>
                </li>
                <li>
                    <MdPlayArrow size={23} />
                    <span>Your videos </span>
                </li>
                <li>
                    <AiFillClockCircle size={23} />
                    <span>Watch Later </span>
                </li>
                <li>
                    <MdThumbUp size={23} />
                    <span>Liked videos </span>
                </li>
                <li>
                    <MdSentimentDissatisfied size={23} />
                    <span>Unliked videos</span>
                </li>
            </div>

            <div className="sidebar__navContainer">
                <h5>More from youtube</h5>
                <li>
                    <AiFillYoutube size={23} />
                    <span>Youtube premium </span>
                </li>
                <li>
                    <IoMdFilm size={23} />
                    <span>Films </span>
                </li>
                <li>
                    <SiYoutubegaming size={23} />
                    <span>Gaming</span>
                </li>
                <li>
                    <RiBroadcastFill size={23} />
                    <span>Live</span>
                </li>
                <li>
                    <GiHanger size={23} />
                    <span>Fashion & Beauty</span>
                </li>
                <li onClick={logoutHandler} >
                    <MdExitToApp size={23} />
                    <span>Exit</span>
                </li>
            </div>


        </nav>
    )
}

export default Sidebar
