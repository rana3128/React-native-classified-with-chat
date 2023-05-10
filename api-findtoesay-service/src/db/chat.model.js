const {
  insert,
  insertMany,
  findMany,
  findOne,
  updateOne,
  deleteOne
} = require("./query");

const { ObjectId } = require('mongodb');
const chatCollection = "chat";

function chatHistory(chatId) {
  return new Promise((reslove, rej) => {
    findOne(chatCollection, { _id: ObjectId(chatId) })
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        rej(err);
        console.log(err);
      });
  });
}

function findChat(adsId, userId) {
  return new Promise((reslove, rej) => {
    const query = {
      $and: [
        { adsId },
        { $or: [{ adsOwner: userId }, { userId }] }
      ]
    }
    findOne(chatCollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        rej(err);
        console.log(err);
      });
  });
}

function userChats(userId) {
  return new Promise((reslove, rej) => {
    findMany(chatCollection, { $or: [{ adsOwner: userId }, { userId }] })
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        rej(err);
        console.log(err);
      });
  });
}

function init(data) {
  return new Promise((reslove, rej) => {
    insert(chatCollection, data)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        rej(err);
        console.log(err);
      });
  });
}

function pushChat(id, msg, userId) {
  return new Promise((reslove, rej) => {
    const createdAt = new Date();
    updateOne(chatCollection, { _id: ObjectId(id) }, { $push: { messages: { msg, userId, createdAt } } })
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        rej(err);
        console.log(err);
      });
  });
}

module.exports = {
  findChat,
  init,
  pushChat,
  chatHistory,
  userChats
}