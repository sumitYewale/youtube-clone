import React, { useState } from 'react'
import './_categoriesbar.scss'
import {getSearchCategoryVideos} from '../../redux/actions/video.action'
import { useDispatch } from 'react-redux'

const keywords = [
    "All", "React Js", "Angular js", "React Native", "Redux", "Bollywood Songs", "Music", "Data Structure", "Coding", "Cricket", "Football", "Live"
]

function CategoriesBar() {

    const dispatch = useDispatch()

    const [activeElement, setActiveElement] = useState("All");
    const activeElementHandler = (value) => {
        setActiveElement(value);
        dispatch(getSearchCategoryVideos(value));
    }

    return (
        <div className="categories_bar">
            {
                keywords.map((value, i) =>
                    <span className={activeElement === value ? " categories_bar__element active" : "categories_bar__element"} key={i} onClick={() => {activeElementHandler(value)}} >
                        {value}
                    </span>
                )
            }
        </div>
    )
}

export default CategoriesBar
