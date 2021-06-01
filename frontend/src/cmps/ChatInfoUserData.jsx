import React, { useEffect, useState } from 'react';
import UndoIcon from '@material-ui/icons/Undo';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function ChatInfoUserData({
    isTyping,
    profileImg,
    userName,
    setChatWith,
    searchMsgText,
    setSearchMsgText,
    numOfResFromSearch,
    chatWith,
    setCurrMarkPrev }) {

    const [isSearchOpen,setIsSearchOpen]= useState(false);

    useEffect(() => {
        setIsSearchOpen(false);
    }, [chatWith])

    function getNextMark() {
        if (numOfResFromSearch === 0) return;
        setCurrMarkPrev(prevState => prevState === numOfResFromSearch ? 1 : prevState + 1)
    }

    function getPrevMark() {
        if (numOfResFromSearch === 0) return;
        setCurrMarkPrev(prevState => prevState === 1 ? numOfResFromSearch : prevState - 1)
    }

    return (
        <div className={`user-info ${isTyping ? 'typing' : ''} ${isSearchOpen?'search-open':''}`}>
            <div className={`flex align-center ${isSearchOpen?'close-when-search-open':''}`}>
                <img src={profileImg} alt="" />
                <div className="flex column">
                    <span>{userName}</span>
                    {isTyping &&
                        <span className="typing">is typing...</span>
                    }
                </div>
            </div>
            {numOfResFromSearch === 0 && searchMsgText &&
                <span className="not-found">Not Found</span>
            }
            <div className="flex align-center">
                <div>
                    <input
                        className={`search ${isSearchOpen? '':'close'}`}
                        placeholder="Search..."
                        type="text" value={searchMsgText}
                        onChange={({ target }) => { setSearchMsgText(target.value) }}
                    />
                </div>
                <div className={`button ${isSearchOpen? '':'close'}`} onClick={getPrevMark}>
                    <ArrowDropUpIcon />
                </div>
                <div className={`button ${isSearchOpen? '':'close'}`} onClick={getNextMark}>
                    <ArrowDropDownIcon />
                </div >
                <div onClick={()=>{setIsSearchOpen(prevState=>!prevState)}} className="button search-button">
                    <SearchIcon />
                </div>
                <div className="return button" onClick={() => { setChatWith('') }}>
                    <UndoIcon />
                </div>
            </div>
        </div>
    )
}