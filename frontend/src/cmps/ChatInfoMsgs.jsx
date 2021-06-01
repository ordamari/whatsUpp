import React, { useEffect, useState } from 'react';

export default function ChatInfoMsgs({
    setElChat,
    chatsDivideByDates,
    searchMsgText,
    setElSearchedMsgs,
    elSearchedMsgs }) {

    function checkIsTailed(idx, msgsInfo) {
        if (idx === 0) return true;
        return msgsInfo[idx - 1].isYourMessage !== msgsInfo[idx].isYourMessage

    }


    function getTime(timestamp) {
        const time = new Date(timestamp);
        return `${time.getHours()}:${time.getMinutes()}`
    }

    function getMsg(text) {
        if (!searchMsgText || !text.includes(text)) return <span>{text}</span>
        const msgParts = text.split(searchMsgText);


        return <span>
            {
                msgParts.map((msgPart, idx) => (
                    <span
                        key={idx}
                    >{msgPart}{idx !== msgParts.length - 1 && <span className="marked">{searchMsgText}</span>}
                    </span>
                ))
            }
        </span>

    }

    function addElSearchMessage(el) {
        if (!el) return;
        if (!elSearchedMsgs[elSearchedMsgs.length-1] || elSearchedMsgs[elSearchedMsgs.length-1].offsetTop < el.offsetTop) {
            setElSearchedMsgs(prevState => {
                if (prevState.length === 0) return [el];
                return [...prevState, el]
            })
        }
    }

    return (
        <div
            className='chat'
            ref={(el) => setElChat(el)}
        >
            {!!chatsDivideByDates.length &&
                chatsDivideByDates.map((date, idx) => (
                    <div key={idx} className="w100 flex column align-center">
                        <div className="date-container">
                            <span>{date.when}</span>
                        </div>
                        <div className="flex column align-start date-chats">
                            {
                                date.chat.map((currMsg, idx, msgsInfo) => (
                                    <div
                                        ref={(el) => { if (searchMsgText && currMsg.info.includes(searchMsgText)) addElSearchMessage(el) }}
                                        key={idx}
                                        className={`chat-pop ${currMsg.isYourMessage ? 'you' : 'him'} ${checkIsTailed(idx, msgsInfo) ? 'tailted' : ''}`}
                                    >
                                        {checkIsTailed(idx, msgsInfo) &&
                                            <div className="tail"></div>
                                        }
                                        {
                                            getMsg(currMsg.info)
                                        }
                                        <span className="time">{getTime(currMsg.sendAt)}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))

            }
        </div>
    )
}