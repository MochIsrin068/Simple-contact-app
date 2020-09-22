import React from 'react'
import {ReactComponent as IconFilter} from '../Assets/Icons/sliders.svg'
import {ReactComponent as IconSearch} from '../Assets/Icons/search.svg'

const SearchCard = ({setKey}) => {
    return (
        <div className="search">
            <div className="search__input">
                <IconSearch/>
                <input onChange={({target : {value}}) => {
                    setKey(value)
                }} placeholder="Search anything..." type="text"/>
            </div>
            <div className="search__button">
                <IconFilter/>
            </div>
        </div>
    )
}


export default SearchCard