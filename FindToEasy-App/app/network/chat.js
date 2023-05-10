import { GetReq, BodyReq } from "./config";


export const chatInit = (adsId, adsOwner) => {
  return new Promise((resolve, reject) => {
    BodyReq("chatInit", "post", { adsId, adsOwner }, true)
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const sendMsg = (chatId, message) => {
  return new Promise((resolve, reject) => {
    BodyReq("chatSend", "post", { chatId, message }, true)
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const chatHistory = (id) => {
  return new Promise((resolve, reject) => {
    GetReq("chatById", true, {}, { id })
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const allChats = () => {
  return new Promise((resolve, reject) => {
    GetReq("chatAll", true, {}, {})
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}