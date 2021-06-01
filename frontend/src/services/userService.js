import httpService from './httpService'



export const userService = {
    login,
    logout,
    add,
    getCurrUser,
    updateUserChatMsg,
    updateMyChats,
    maskReadChat,
    // updateUserOwners,
    // updateUserAppointments,
    // cancelUserAppointment,
    // updateUserFavorites,
    // removeUserFavorite,
    // getUserByName,
    // updateUserTemplates,
    // deleteUserTemplate,
    getUsers
}



async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();

}
function getCurrUser() {
    let currUser = sessionStorage.getItem('user')
    currUser = JSON.parse(currUser)
    return currUser

}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function add(user) {
    const returnedUser = await httpService.post('auth/signup', user)
    return _handleLogin(returnedUser)

}

function getUsers() {
    return httpService.get('user')
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}


// async function getById(userId){
//     try {
//         var user = await httpService.get(`user/${userId}`);
//         return user
//       } catch (err) {
//         console.log(err);
//     }
// }

async function updateUserChatMsg(userId,chatWith,msg) {
    try{
        const newUser= await httpService.put(`user/${userId}`, { from:userId,chatWith,info: msg,sendAt: Date.now()})
        _handleLogin(newUser)
        return newUser
    }
    catch{
        console.log('eror');
    }
}

async function maskReadChat(userId,chatWith) {
    try{
        const newUser= await httpService.put(`user/maskRead/${userId}`, {userId,chatWith})
        _handleLogin(newUser)
        return newUser
    }
    catch{
        console.log('eror');
    }
}

async function updateMyChats() {
    try{
        const user=JSON.parse(sessionStorage.user);
        const newUser= await httpService.get(`user/${user._id}`)
        _handleLogin(newUser)
        return newUser
    }
    catch{
        console.log('eror');
    }
}

// async function updateUserTemplates(userId,page){
    // try{
    //     const newUser= await httpService.put(`user/${userId}`, page)
    //     _handleLogin(newUser)
    //     return newUser
    // }
    // catch{
    //     console.log('eror');
    // }
// }

// async function deleteUserTemplate(userId,pageName){
//     try{
//         const newUser= await httpService.put(`user/deleteTemplate/${userId}`, {pageName})
//         _handleLogin(newUser)
//         return newUser
//     }
//     catch{
//         console.log('eror');
//     }
// }



// async function updateUserAppointments(userId,appointment) {
//     const user = await getById(userId);
//     user.appointments.unshift(appointment)
//     try{
//         const newUser= await httpService.put(`user/${user._id}`, user)
//         _handleLogin(newUser)
//         return newUser

//     }catch(err){
//         console.log(err);
//     }
// }

// async function updateUserFavorites(userId,owner) {
//     const user = await getById(userId);
//     if(!user.favorites) user.favorites=[owner];
//     else user.favorites.unshift(owner);
//     try{
//         const newUser= await httpService.put(`user/${user._id}`, user)
//         _handleLogin(newUser)
//         return newUser

//     }catch(err){
//         console.log(err);
//     }
// }

// async function removeUserFavorite(userId,ownerId) {
//     const user = await getById(userId);
//    const userFav=user.favorites.filter(owner=>owner._id!==ownerId);
//    user.favorites=userFav;
//     try{
//         const newUser= await httpService.put(`user/${user._id}`, user);
//         _handleLogin(newUser)
//         return newUser

//     }catch(err){
//         console.log(err);
//     }
// }

// async function cancelUserAppointment(userId,appointmentIdx) {
//     const user = await getById(userId);
//     const appointments= user.appointments.filter((appointment,idx)=>idx!==appointmentIdx);
//     user.appointments=appointments
//     try{
//         const newUser= await httpService.put(`user/${user._id}`, user)
//         _handleLogin(newUser)
//         return newUser

//     }catch(err){
//         console.log(err);
//     }
// }




// async function getUserByName(userName){
//     try {
//         var user = await httpService.get(`user/name/${userName}`);
//         return user
//       } catch (err) {
//         console.log(err);
//     }
// }

