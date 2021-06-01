import React, { useEffect, useState } from 'react';
import ChatPreview from './ChatPreview';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


export default function ChatList({ loggedInUser,logout, userMapNames, userMapProfileImage, chatIdx, setChatWith, users, chatWith, usersTyping }) {

  const [name, setName] = useState('');
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getUserList();
    getChatList();
  }, [name, loggedInUser])

  function getUserList() {
    if (!name) return [];
    const newUsers = users.filter(user => {
      return user._id !== loggedInUser._id && !loggedInUser.chats.find(chat => chat.chatWith === user._id) && user.username.toLowerCase().includes(name.toLowerCase());
    })
    setUserList(newUsers);
  }

  function getChatList() {
    if (!name) return setChatList(loggedInUser.chats);
    const newChats = loggedInUser.chats.filter(chat => {
      return userMapNames[chat.chatWith].toLowerCase().includes(name.toLowerCase());
    });
    setChatList(newChats)
  }

  function sortChatList() {
    return chatList.sort((firstChat, secondChat) => {
      const firstTimestamp = firstChat.chat[firstChat.chat.length - 1].sendAt;
      const secondTimestamp = secondChat.chat[secondChat.chat.length - 1].sendAt;
      return secondTimestamp - firstTimestamp;
    })
  }

  function getNumOfNewMsg(chat) {
    return chat.chat.reduce((acc, msg) => {
      if (!msg.isYourMessage && !msg.isRead) acc++
      return acc
    }, 0)
  }


  return (
    <div className={`chat-list ${chatWith ? 'close' : 'open'}`}>
      <div className="user-info">
        <div className="flex align-center">
          <img src={loggedInUser.profileImg} alt="" />
          <span>welcome back, {loggedInUser.username}</span>
        </div>
        <div onClick={()=>{setIsMenuOpen(prevState=>!prevState)}} className="open-menu flex align-center">
          <ArrowDropDownIcon />
        </div>
        <div className={`menu ${isMenuOpen? '':'close'}`}>
          <div onClick={()=>{logout()}}>
            <span>logout</span>
          </div>
        </div>
      </div>
      <div className="input-container">
        <div onClick={() => { setName('') }} className="icon-container">
          {
            name ? <ArrowBackIcon /> : <SearchIcon />
          }

        </div>
        <input type="text" value={name} onChange={({ target }) => { setName(target.value) }} placeholder="Search or start new chat" />
      </div>
      <div className="chats">
        {
          sortChatList().map((chat, idx) => (
            <ChatPreview
              isTyping={usersTyping[chat.chatWith]}
              chatWith={chatWith}
              key={chat.chatWith}
              numOfNewMsg={getNumOfNewMsg(chat)}
              name={userMapNames[chat.chatWith]}
              userProfile={userMapProfileImage[chat.chatWith]}
              lastMsg={chat.chat[chat.chat.length - 1]}
              userId={chat.chatWith}
              setChatWith={setChatWith}
            />
          ))
        }
        {
          name &&
          userList.map((user, idx) => (
            <ChatPreview
              key={idx}
              name={user.username}
              userProfile={user.profileImg}
              userId={user._id}
              idx={-2}
              choosenChatIdx={chatIdx}
              setChatWith={setChatWith}

            />
          ))
        }

      </div>

    </div>
  )
}

