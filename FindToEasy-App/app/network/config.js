import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { accessToken } from "../auth/auth";

const Url = {
  base: "http://13.126.146.194:5000",
  createUser: "/v1/user",
  getUser: "/v1/user/{userId}",
  login: "/v1/login",
  userAds: "/v1/classified/user",
  createAds: "/v1/classified",
  activeAction: "/v1/classified/active/{adsId}/action/{action}",
  updateAds: "/v1/classified/update/{adsId}",
  deleteAds: "/v1/classified/delete/{adsId}",

  adsById: "/v1/classified/{adsId}",
  adsByCat: "/v1/classified/catagory/{cat}",
  adsSearch: "/v1/classified/search/{key}",
  uploadImage: "/v1/upload/image",

  chatInit: "/v1/chat/init",
  chatSend: "/v1/chat/send",
  chatAll: "/v1/chat/all",
  chatById: "/v1/chat/{id}"
};

const getHeaders = (ch) => {
  return {
    "Authorization": accessToken,
    ...ch
  }
}

const mapPathParams = (url, params) => {
  Object.keys(params).forEach(key => {
    url = url.replace(`{${key}}`, params[key]);
  })
  return url;
}

export const GetReq = (url, isPrivate = false, customHeader = {}, paramsMap = {}) => {
  let pathUrl = mapPathParams(Url[url], paramsMap);
  const headers = isPrivate ? getHeaders(customHeader) : {};
  return axios.get(Url.base + pathUrl, { headers })
}

export const BodyReq = (url, method, data, isPrivate = false, customHeader = {}, paramsMap = {}) => {
  let pathUrl = mapPathParams(Url[url], paramsMap);
  const headers = isPrivate ? getHeaders(customHeader) : {};
  console.log(headers);
  return axios({
    method,
    url: Url.base + pathUrl,
    headers,
    data
  });
}


