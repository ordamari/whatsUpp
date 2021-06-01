import React, { useEffect, useState } from 'react';
import { socketService } from '../services/socketService'
import { notificationService } from '../services/notification-service'
import ChatList from '../cmps/ChatList';
import ChatInfo from '../cmps/ChatInfo';
import { connect } from 'react-redux'
import { loadUsers, sendMsg, updateMyChats, maskReadChat, onLogout } from '../actions/userActions'




function _Home(props) {


  const [chatWith, setChatWith] = useState('');
  const [users, setUsers] = useState([]);
  const [userMapNames, setUserMapNames] = useState(getUsersMapNames());
  const [userMapProfileImage, setUserMapProfileImage] = useState(getUsersMapProfileImage());
  const [usersTyping, setUsersTyping] = useState({});
  const [isPremissionNotification,setIsPremissionNotification]= useState(false);

  useEffect(() => {
    Notification.requestPermission((status)=>setIsPremissionNotification(status==='granted'))
    if (!props.loggedinUser) props.history.push('/login');
    else {
      props.updateMyChats();
      const userChats = props.loggedinUser.chats.reduce((acc, chat) => {
        return {
          ...acc,
          [chat.chatWith]: false
        }
      }, {})
      setUsersTyping(userChats);
    }
    loadUsers();

  }, [])

  useEffect(() => {
    if(isPremissionNotification){
      supportPushNotification();
    }
  }, [isPremissionNotification])

  useEffect(() => {
    setUserMapNames(getUsersMapNames());
    setUserMapProfileImage(getUsersMapProfileImage());
  }, [users])

  useEffect(() => {
    socketService.setup();
    if (props.loggedinUser) {
      socketService.emit('connect-my-id', props.loggedinUser._id);
    }
    socketService.on('update-chat', onGetMsg);
    socketService.on('user-start-chat', userStartTyping);
    socketService.on('user-end-chat', userEndTyping);

    return () => {
      socketService.off('update-chat', () => { console.log('ok') });
      socketService.off('user-start-chat', () => { console.log('ok') });
      socketService.off('user-end-chat', () => { console.log('ok') });
      socketService.terminate()
    }
  }, [])

  async function onGetMsg(){
    await loadUsers();
    await props.updateMyChats();
  }

  async function loadUsers() {
    const newUsers = await props.loadUsers();
    setUsers(newUsers);
  }

  function getUsersMapNames() {
    return users.reduce((acc, user) => {
      acc = { ...acc, [user._id]: user.username }
      return acc
    }, {})
  }

  function getUsersMapProfileImage() {
    return users.reduce((acc, user) => {
      acc = { ...acc, [user._id]: user.profileImg }
      return acc
    }, {})
  }

  function updateMsgToGetter(chatWith) {
    socketService.emit('msg-send', chatWith);
  }

  function userStartTyping(id) {
    setUsersTyping(prevState => {
      return {
        ...prevState,
        [id]: true
      }
    })
  }

  function userEndTyping(id) {
    setUsersTyping(prevState => {
      return {
        ...prevState,
        [id]: false
      }
    })
  }

  function onStartTyping() {
    socketService.emit('start-typing', chatWith);
  }

  function onEndTyping() {
    socketService.emit('end-typing', chatWith);
  }

  async function supportPushNotification(){
    await notificationService.createNotificationSubscription();
    const userSubscription= await notificationService.getUserSubscription();
    await notificationService.sendSubscriptionToPushServer(userSubscription,props.loggedinUser._id);
  } 

  async function sendNotification(msg){
    const userSubscriptionId = users.find(user=>user._id===chatWith).susbscriptionId;
    if(!userSubscriptionId) return;
    const push= {title:props.loggedinUser.username,info:{body:msg,icon:props.loggedinUser.profileImg}}
    await notificationService.sendNotification(userSubscriptionId,push)
  }

  async function logout(ev) {
    await props.onLogout();
    console.log(props.loggedInUser);
    props.history.push('/login')
}

  


  return (

      props.loggedinUser &&
        <div className="flex home">

          <ChatList
            usersTyping={usersTyping}
            chatWith={chatWith}
            loggedInUser={props.loggedinUser}
            userMapNames={userMapNames}
            userMapProfileImage={userMapProfileImage}
            setChatWith={setChatWith}
            users={users}
            logout={logout}
            />
          <ChatInfo
            isTyping={usersTyping[chatWith]}
            onStartTyping={onStartTyping}
            onEndTyping={onEndTyping}
            chatWith={chatWith}
            users={users}
            chat={props.loggedinUser.chats.find(chat => chat.chatWith === chatWith)}
            sendMsg={props.sendMsg}
            loggedinUser={props.loggedinUser}
            updateMsgToGetter={updateMsgToGetter}
            maskReadChat={props.maskReadChat}
            sendNotification={sendNotification}
            setChatWith={setChatWith}
            />
        </div>
      
  )
}
const mapStateToProps = state => {
  return {
    loggedinUser: state.user.loggedinUser,
    users: state.user.users

  }
}
const mapDispatchToProps = {
  loadUsers,
  sendMsg,
  updateMyChats,
  maskReadChat,
  onLogout
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)



