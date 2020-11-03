import axios from 'axios';
import {BASE_URL} from './const';
const ROOM_BASE_URL = BASE_URL +  '/room'

const createRoom = async (username) => {
    try{
        const URL = ROOM_BASE_URL + '/new'
        const result = await axios.post(URL , {
            username
        })
        console.log(result.data);
        return result.data;
    }catch(err){
        return err
    }
}

const sendMessage = async (userId , message , roomId ) => {
    try{
        const URL = ROOM_BASE_URL + '/newmessage'
        const result = await axios.post(URL , {
            userId , message , roomId
        })
        return result.data;  
    }catch(err){
        console.log(err)
        return err
    }
}

const joinRoom = async (username , roomId) => {
    try{
        console.log(roomId)
        console.log(username)
        const URL = ROOM_BASE_URL + '/join'
        const result = await axios.post(URL , {
            username , roomId
        })
        console.log(result.data)
        return result.data;  
    }catch(err){
        console.log(err)
        return err
    }
}

export{
    createRoom,
    sendMessage,
    joinRoom
}