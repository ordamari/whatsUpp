import React, { useEffect, useState } from 'react';
import { timeService } from '../services/timeService'
import UndoIcon from '@material-ui/icons/Undo';
import EmojiKeyboard from './EmojiKeyboard';
import ChatInfoNoChat from './ChatInfoNoChat';
import ChatInput from './ChatInput';
import ChatInfoUserData from './ChatInfoUserData';
import ChatInfoMsgs from './ChatInfoMsgs';



var typingTimeOut;
export default function ChatInfo({ users, chat, sendMsg, loggedinUser, updateMsgToGetter, setChatWith, chatWith, maskReadChat, onStartTyping, onEndTyping, isTyping, sendNotification }) {
  const [profileImg, setProfileImg] = useState("https://res.cloudinary.com/dif8yy3on/image/upload/v1600550105/vgtz58l672lcmxishf1k.png");
  const [userName, setUserName] = useState('');
  const [chatsDivideByDates, setChatsDivideByDates] = useState([]);
  const [newMsgInfo, setNewMsgInfo] = useState('');
  const [isEmojiKeyboardOpen, setIsEmojiKeyboardOpen] = useState(false);
  const [searchMsgText, setSearchMsgText] = useState('');
  const [currMarkPrev, setCurrMarkPrev] = useState(0);
  const [lastMaxScroll,setLastMaxScroll]= useState(0)

  const [elChat, setElChat] = useState(null);
  const [elInput, setElInput] = useState(null);
  const [elSearchedMsgs, setElSearchedMsgs] = useState([]);

  


  useEffect(() => {
    if (newMsgInfo) {
      onStartTyping();
      if (typingTimeOut !== undefined) clearTimeout(typingTimeOut);
      typingTimeOut = setTimeout(() => { onEndTyping() }, 500)
    }
  }, [newMsgInfo])

  useEffect(() => {
    setElSearchedMsgs([]);
    setCurrMarkPrev(0);
    setLastMaxScroll(0);
    setSearchMsgText('');
    setNewMsgInfo('');
    if (chatWith) {
      const user = users.find(user => user._id === chatWith);
      setProfileImg(user.profileImg);
      setUserName(user.username);
      setChatsDivideByDates(divideByDates);
      if (loggedinUser.chats.find(chat => chat.chatWith === chatWith)?.chat.find(msg => !msg.isYourMessage && !msg.isRead)) {
        maskReadChat(loggedinUser._id, chatWith);
      }
    }
  }, [chatWith, loggedinUser])

  useEffect(() => {
    if (elInput) {

      if (isEmojiKeyboardOpen) elInput.blur();
      else elInput.focus();
    }
  }, [isEmojiKeyboardOpen])

  useEffect(() => {
    setElSearchedMsgs([]);
  }, [searchMsgText])

  useEffect(() => {
    setCurrMarkPrev(elSearchedMsgs.length)
  }, [elSearchedMsgs])

  useEffect(() => {
    if (currMarkPrev <= 0) return;
    elChat.scrollTo(0, elSearchedMsgs[currMarkPrev - 1].offsetTop - elChat.offsetTop)
  }, [currMarkPrev])

  function getDateMsg(timestamp) {
    if (timeService.isToday(timestamp)) return "Today";
    if (timeService.isYesterday(timestamp)) return "Yesterday";
    if (timeService.isLastWeek(timestamp)) return timeService.getDay(timestamp);
    return timeService.getFullDate(timestamp);
  }

  function divideByDates() {
    if (chat) {
      return chat.chat.reduce((acc, msg) => {
        if (acc.length === 0) acc = [{ when: getDateMsg(msg.sendAt), chat: [msg] }];
        else if (new Date(acc[acc.length - 1].chat[0].sendAt).getDate() === new Date(msg.sendAt).getDate()) acc[acc.length - 1].chat.push(msg);
        else acc.push({ when: getDateMsg(msg.sendAt), chat: [msg] })
        return acc
      }, [])
    } else {
      return [];
    }

  }

  async function onSendMsg(ev) {
    ev.preventDefault();
    elInput.focus();
    const newMsg= newMsgInfo.replace(/\s+/g, ' ').trim();
    if (!newMsg){
      setNewMsgInfo('');
      return;
    } 
    await sendMsg(loggedinUser._id, chat ? chat.chatWith : chatWith, newMsg);
    sendNotification(newMsg);
    setNewMsgInfo('');
    updateMsgToGetter(chat ? chat.chatWith : chatWith);
  }

  function addEmoji(emoji) {
    setNewMsgInfo(prevState => prevState + emoji)
  }

  function toggleIsEmojiKeyboardOpen(ev) {
    ev.stopPropagation();
    setIsEmojiKeyboardOpen(prevState => !prevState);
  }


  if (elChat && lastMaxScroll<elChat.scrollHeight) {
    setLastMaxScroll(elChat.scrollHeight)
    elChat.scrollTo(0, elChat.scrollHeight);
  }



  return (
    <div className={`chat-info ${!chatWith ? 'close' : 'open'}`}>
      {!chatWith ?
        <ChatInfoNoChat />
        : (
          <>
            <ChatInfoUserData
            chatWith={chatWith}
              setCurrMarkPrev={setCurrMarkPrev}
              numOfResFromSearch={elSearchedMsgs.length}
              isTyping={isTyping}
              profileImg={profileImg}
              userName={userName}
              setChatWith={setChatWith}
              searchMsgText={searchMsgText}
              setSearchMsgText={setSearchMsgText}
            />
            <ChatInfoMsgs
              elSearchedMsgs={elSearchedMsgs}
              setElSearchedMsgs={setElSearchedMsgs}
              setElChat={setElChat}
              chatsDivideByDates={chatsDivideByDates}
              searchMsgText={searchMsgText}
            />
            { isEmojiKeyboardOpen &&
              <EmojiKeyboard
                addEmoji={addEmoji}
              />
            }
            <ChatInput
              onSendMsg={onSendMsg}
              toggleIsEmojiKeyboardOpen={toggleIsEmojiKeyboardOpen}
              isEmojiKeyboardOpen={isEmojiKeyboardOpen}
              setIsEmojiKeyboardOpen={setIsEmojiKeyboardOpen}
              setElInput={setElInput}
              newMsgInfo={newMsgInfo}
              setNewMsgInfo={setNewMsgInfo}
            />
          </>
        )}
    </div>
  )
}

