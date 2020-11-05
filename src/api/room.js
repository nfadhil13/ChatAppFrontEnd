import axios from "axios";
import { BASE_URL } from "./const";
const ROOM_BASE_URL = BASE_URL + "/room";

const createRoom = async (username) => {
  try {
    const URL = ROOM_BASE_URL + "/new";
    const result = await axios.post(URL, {
      username,
    });

    return result.data;
  } catch (err) {
    return err;
  }
};

const sendMessage = async (userId, message, roomId, sendedTime) => {
  try {
    const URL = ROOM_BASE_URL + "/newmessage";
    const result = await axios.post(
      URL,
      {
        userId,
        message,
        roomId,
        sendedTime,
      },
      { timeout: 10000 }
    );
    return result.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const joinRoom = async (username, roomId) => {
  try {
    const URL = ROOM_BASE_URL + "/join";
    const result = await axios.post(URL, {
      username,
      roomId,
    });
    return result.data;
  } catch (err) {
    return err;
  }
};

const checkIfRoomExist = async (roomId) => {
  try {
    const URL = ROOM_BASE_URL + "/checkroom/" + roomId;
    const result = await axios.get(URL);
    return result.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const checkIsUserInRoom = async (roomId, userId) => {
  try {
    const URL = ROOM_BASE_URL + "/isuserinroom";
    const result = await axios.post(URL, {
      userId,
      roomId,
    });
    return result.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {
  createRoom,
  sendMessage,
  joinRoom,
  checkIfRoomExist,
  checkIsUserInRoom,
};
