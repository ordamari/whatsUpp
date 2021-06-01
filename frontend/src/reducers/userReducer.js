const localLoggedinUser = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;


const initialState = {
    users: [],
    loggedinUser: localLoggedinUser
}

export default function(state = initialState, action={}) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedinUser: action.user
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'UPDATE_USER':
            
            return {
                ...state,
                users: state.users.map(user => user._id === state.loggedinUser._id ? action.user : user),
                loggedinUser: action.user
            }
        case 'UPDATE_CHAT':
            
            return {
                ...state,
                loggedinUser: action.currUser
            }
        default:
            return state
    }
    
}