import { GetReq, BodyReq } from "./config";


export const register = (username, password) => {
  return new Promise((resolve, reject) => {
    BodyReq("createUser", "post", { username, password }, false)
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    BodyReq("login", "post", { username, password }, false)
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const userAds = () => {
  return new Promise((resolve, reject) => {
    GetReq("userAds", true)
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const apiActiveAction = (adsId, action) => {
  return new Promise((resolve, reject) => {
    GetReq("activeAction", true, {}, { adsId, action })
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const apiDeleteAds = (adsId) => {
  return new Promise((resolve, reject) => {
    BodyReq("deleteAds", "delete", true, {}, {}, { adsId })
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}