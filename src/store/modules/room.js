import {createRoom , sendMessage , joinRoom , checkIsUserInRoom , checkIfRoomExist} from '../../api/room'
import RoomResponState from '../responsestates/room';
const USER_ID_KEY = 'userId';

const MessageStatus = {
    PENDING : 'MESSAGE_STATUS_PENDING',
    SENT : 'MESSAGE_STATUS_SENT',
    FAILED : 'MESSAGE_STATUS_FAILED'

}

const getUserFromLocalStorage = () => {
    try{
        const user = JSON.parse(localStorage.getItem(USER_ID_KEY));
        return user.id
    }catch(err){
        return null
    }
}

const state = {
    roomId : '',
    state : {
        isLoading : false,
        success : false,
        error : false,
        message : ''
    },
    users : [],
    messages : [],
    newMessages : []
}

const mutations = {
    SET_LOADING(state){
        state.state = {
            isLoading : true,
            success : false,
            error : false,
            message : ''
        };
    },
    SET_ERROR(state , errorMessageStatus){
        state.state = {
            isLoading : false,
            success : false,
            error : true,
            message : errorMessageStatus
        };
    },
    SET_SUCCESS(state , successMessageStatus){
        state.state = {
            isLoading : false,
            success : true,
            error : false,
            message : successMessageStatus
        };
    },
    SET_ROOM_ID(state , roomId){
        state.roomId = roomId
    },
    SET_USER(state , users){
        state.users[0] = users
        localStorage.setItem(USER_ID_KEY,JSON.stringify(users))
    },
    SET_MESSAGES(state , messages){
        state.messages = messages
    },
    PUSH_MESSAGES(state ,message){
        if(state.users[0].id === message.user.id){
            message.isUser = true;
            if(message.status === MessageStatus.PENDING){
                state.newMessages.push(message);
            }else{
                const newMessageLength = state.newMessages.length
                const currentMessageTime = message.status === MessageStatus.SENT?  (new Date((Date.parse(message.time))) ).getTime() : message.id                              
                for(let i=0;i<newMessageLength ; i++){
                    if(state.newMessages[i].id === currentMessageTime){
                        state.newMessages[i] = message
                        break;
                    }
                }
            }
        }else{
            message.isUser = false;
            if(state.newMessages.length > 0) {
                state.newMessages.push(message)
            }else{
                state.messages.push(message)
            }            
        }
        const newMessageLength = state.newMessages.length
        let sentMessage = 0;
        for(let i=0;i<newMessageLength ; i++){
            if(state.newMessages[i].status === MessageStatus.PENDING){
                    break;
            }
            sentMessage++;
        }
        if(sentMessage > 0){
            const confirmedNewMessage = state.newMessages.slice(0 , sentMessage)
            state.messages = state.messages.concat(confirmedNewMessage);
            state.newMessages = state.newMessages.slice(sentMessage,newMessageLength)
        }     
    },
    CLEAR_DATA(state){
        state.roomId =  '';
        state.users= [];
        state.state = {
            isLoading : false,
            success : false,
            error : false,
            message : ''
        }        
        state.messages = [];
    }
}

const actions = {
    createRoom : async ({commit} , username) => {
        //Stupid
        commit('SET_LOADING')
        commit('CLEAR_DATA');
        const result = await createRoom(username);
        if(!(result instanceof Error)){
            commit('SET_USER' , {
                username,
                id : result.data.userId
            });
            commit('SET_ROOM_ID' ,  result.data.roomId);
            commit('SET_SUCCESS' , RoomResponState.CREATE_ROOM_SUCCESS)
        }else{
            commit('SET_ERROR' , result.message || 'unknown error')
        }
    },
    sendMessage : async ({commit , state} , {userId , message , roomId}) => {
        commit('SET_LOADING');
        const sendedTime = new Date();
        commit('PUSH_MESSAGES' , {
                id : sendedTime.getTime(),
                message : message,
                time : sendedTime,
                user : state.users[0],
                status : MessageStatus.PENDING
        })
        const result = await sendMessage(userId , message , roomId , sendedTime);
        if(!(result instanceof Error)){
            commit('PUSH_MESSAGES' , {
                ...result.data,
                status : MessageStatus.SENT
            })
            commit('SET_SUCCESS' , result.message)
            
        }else{
            commit('PUSH_MESSAGES' , {
                id : sendedTime.getTime(),
                message : message,
                time : sendedTime,
                user : state.users[0],
                status : MessageStatus.FAILED
        })
            commit('SET_ERROR' , result.message || 'unknown error')
        }
    },
    pushMessage : ({commit} , message) => {
        commit('PUSH_MESSAGES' , message)
    },
    joinRoom : async ({commit} , {username , roomId}) => {
        commit('SET_LOADING')
        commit('CLEAR_DATA');
        const result = await joinRoom(username , roomId);
        if(!(result instanceof Error)){
            commit('SET_USER' , {
                username,
                id : result.data.user.id
            });
            commit('SET_ROOM_ID' ,  result.data.roomId);
            commit('SET_SUCCESS' , RoomResponState.JOIN_ROOM_SUCCESS);
        }else{
            commit('SET_ERROR' , result.message || 'unknown error')
        }       
    },
    validateJoinRoom : async ({commit,  state} , {theRoomId} ) => {
        if(state.roomId !== theRoomId) commit('SET_ROOM_ID' , theRoomId);
        let roomId =  state.roomId
        if(roomId){
            const isRoomExist = await checkIfRoomExist(roomId);
            if(!(isRoomExist instanceof Error)){  
                const userId = (state.users[0])? state.users[0].id : getUserFromLocalStorage();
                if(userId){
                    const isUserInRoom = await checkIsUserInRoom(roomId , userId)
                    if(!(isUserInRoom instanceof Error)){
                        commit('SET_USER' , {
                            username : isUserInRoom.data.user.username,
                            id :isUserInRoom.data.user.id
                        });
                        commit('SET_ROOM_ID' ,  isRoomExist.data.room._id);
                        commit('SET_MESSAGES' , isRoomExist.data.room.chats);
                        return commit('SET_SUCCESS' , RoomResponState.VALIDATE_JOIN_SUCCESS);        
                    }
                    return commit('SET_ERROR' , RoomResponState.USER_IS_NOT_IN_ROOM)
                }
                return commit('SET_ERROR' , RoomResponState.NO_USER_PROVIDED )
            }
        }
        return commit('SET_ERROR' , RoomResponState.ROOM_IS_NOT_EXIST)
        
    },
    clearData({commit}){
        commit('CLEAR_DATA');
    }
    
}

const getters = {
    roomId : state => {
        return state.roomId;
    },
    state : state => {
        return state.state
    },
    messages : state => {
        return state.messages.concat(state.newMessages);
    },
    user : state => {
        return state.users[0]
    }
}

export default {
    namespaced : true,
    state,
    getters,
    mutations,
    actions
}
