import React,{useEffect , useState} from 'react'
import './_header.scss'

import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps, MdDehaze, MdSearch, MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const constants = require('../../helper/assetHelper');

function Header({toggleSidebar , toggleSearchBar , searchBar}) {
    
    const[userAvatar , setUserAvatar]= useState('');
    const stateData = useSelector(state => state.auth);
    
    useEffect(() => {
        const user_image = stateData.picture !=="" ? 
        stateData.picture : 'https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg';
        setUserAvatar(user_image);
    }, [userAvatar,stateData])

    return (
        <div className=" header" >
            <div className="header__logoContainer">
                <MdDehaze className="header__menu" size={22} onClick={toggleSidebar} />
                <img className="header__logo" src={constants.darkLogoPath.default} alt="" />
            </div>

            <div className="header__searchBarContainer">
                <form>
                    <input type="text" placeholder="Search" />
                    <button type="submit" >
                        <AiOutlineSearch size={20} />
                    </button>
                </form>
            </div>


            <div className="header__icons">
                <button type="button" >
                    <MdSearch size={25} onClick={toggleSearchBar} />
                </button>
                <MdApps size={25} />
                <MdNotifications size={25} />
                <Link to="/login" >
                    
                <img src={userAvatar} alt="" />
                </Link>
            </div>

            <div className={searchBar ? "header__MobileSearchContainer active" : "header__MobileSearchContainer"} >
                <div className="searchBar_container">
                    <div className="search_back_button">
                        <MdArrowBack size={25} onClick={toggleSearchBar} />
                    </div>
                    <div className="searchBar">
                        <form>
                            <input type="text" placeholder="Search" />
                            <button type="submit" >
                                <AiOutlineSearch size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
