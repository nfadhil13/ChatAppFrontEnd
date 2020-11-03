import {createRoom , sendMessage , joinRoom} from '../../api/room' 
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
}

const mutations = {
    SET_LOADING(state){
        state.state = {
            isLoading : true,
            success : false,
            error : false,
            message : ''
        }
    },
    SET_ERROR(state , errorMessageStatus){
        state.state = {
            isLoading : false,
            success : false,
            error : true,
            message : errorMessageStatus
        }
    },
    SET_SUCCESS(state , successMessageStatus){
        state.state = {
            isLoading : false,
            success : true,
            error : false,
            message : successMessageStatus
        }
    },
    SET_ROOM_ID(state , roomId){
        state.roomId = roomId
    },
    SET_USER(state , users){
        state.users[0] = users
    },
    SET_MESSAGES(state , messages){
        state.messages = messages
    },
    PUSH_MESSAGES(state , messsage){
        state.messages.push(messsage)
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
            commit('SET_SUCCESS' , result.message)
        }else{
            commit('SET_ERROR' , result.message || 'unknown error')
        }
    },
    sendMessage : async ({commit} , {userId , message , roomId}) => {
        commit('SET_LOADING');
        const result = await sendMessage(userId , message , roomId)
        if(!(result instanceof Error)){
            commit('SET_SUCCESS' , result.message)
        }else{
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
            commit('SET_ROOM_ID' ,  result.data.room._id);
            commit('SET_MESSAGES' , result.data.room.chats);
            commit('SET_SUCCESS' , result.message);
        }else{
            commit('SET_ERROR' , result.message || 'unknown error')
        }       
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
        return state.messages;
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
