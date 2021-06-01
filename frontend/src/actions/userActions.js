import { userService } from '../services/userService'

export function onLogin(credentials) {
  return async dispatch => {
    const user = await userService.login(credentials)
    dispatch({ type: 'SET_USER', user })

  }
}
export function onLogout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}

export function onSignup(cred) {
  return async dispatch => {
    const user = await userService.add(cred)
    dispatch({ type: 'SET_USER', user })
  }
}

// export function updateUserTemplates(userId, page) {
//   return async dispatch => {
//     const newUser = await userService.updateUserTemplates(userId, page);
//     dispatch({ type: 'UPDATE_USER', user: newUser })
//   }
// }

// export function getUserByName(name) {
//   return async dispatch => {
//     const user = await userService.getUserByName(name);
//     return user
//   }
// }

// export function updateUserTemplates(userId, page) {
//   return async dispatch => {
//     const newUser = await userService.updateUserTemplates(userId, page);
//     dispatch({ type: 'UPDATE_USER', user: newUser })
//   }
// }

// export function deleteUserTemplate(userId, pageName) {
//   return async dispatch => {
//     const newUser = await userService.deleteUserTemplate(userId, pageName);
//     dispatch({ type: 'UPDATE_USER', user: newUser })
//   }
// }

export function loadUsers() {
  return async dispatch => {
    try {
      const users = await userService.getUsers();
      dispatch({ type: 'SET_USERS', users });
      return users;
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    };
  }
}
export function sendMsg(userId,chatWith,msg) {
  return async dispatch => {
    try {
      const currUser = await userService.updateUserChatMsg(userId,chatWith,msg);
      dispatch({ type: 'UPDATE_CHAT', currUser });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    };
  }
}

export function maskReadChat(userId,chatWith) {
  return async dispatch => {
    try {
      const currUser = await userService.maskReadChat(userId,chatWith);
      dispatch({ type: 'UPDATE_CHAT', currUser });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    };
  }
}

export function updateMyChats() {
  return async dispatch => {
    try {
      const currUser = await userService.updateMyChats();
      dispatch({ type: 'UPDATE_CHAT', currUser });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    };
  }
}











