import { GetReq, BodyReq } from "./config";


export const createAds = (data) => {
  return new Promise((resolve, reject) => {
    BodyReq("createAds", "post", data, true)
      .then(resData => {
        console.log(resData);
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const uploadImage = (formData) => {
  return new Promise((resolve, reject) => {
    BodyReq("uploadImage", "put", formData, true, { 'Content-Type': 'multipart/form-data' })
      .then()
      .then(resData => {
        console.log(resData);
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const adsByCat = (cat) => {
  return new Promise((resolve, reject) => {
    GetReq("adsByCat", false, {}, { cat })
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}

export const adsById = (adsId) => {
  return new Promise((resolve, reject) => {
    GetReq("adsById", false, {}, { adsId })
      .then(resData => {
        resolve(resData.data || null);
      }).catch(err => reject(err));
  })
}