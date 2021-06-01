import React, { useEffect, useState } from 'react';
import { timeService } from '../services/timeService'


export default function ChatPreview({ name, lastMsg, userProfile, userId, setChatWith, numOfNewMsg, chatWith, isTyping }) {

  function getDateMsg() {
    const timestamp = lastMsg.sendAt;
    if (timeService.isToday(timestamp)) return timeService.getTime(timestamp);
    if (timeService.isYesterday(timestamp)) return "Yesterday";
    if (timeService.isLastWeek(timestamp)) return timeService.getDay(timestamp);
    return timeService.getFullDate(timestamp);
  }


  return (
    <div onClick={() => { setChatWith(userId) }} className={`chat-preview flex align-center ${userId === chatWith ? 'choosen' : ''}`}>
      <div className="img-container">
        <img src={userProfile} alt="" />
      </div>
      <div className="info">
        <div className="flex align-center justify-space-between">
          <span>{name}</span>
          {lastMsg &&
            <span className="date">{getDateMsg()}</span>
          }
        </div>
        <div className="msg flex justify-space-between">
          {lastMsg &&
            <>
            <div className="msg">
              {isTyping ?
                <span >typing...</span>
                :
                <span  >{lastMsg.info}</span>
              }
              </div>
              {!!numOfNewMsg &&
                <span className="new-msgs">{numOfNewMsg}</span>
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

