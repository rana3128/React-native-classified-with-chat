const {
  insert,
  insertMany,
  findMany,
  findOne
} = require("./query");

const { ObjectId } = require('mongodb');
const usercollection = "user"


function adduser(data) {
  return new Promise((reslove, rej) => {
    insert(usercollection, data)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        rej(err);
        console.log(err);
      });
  });
}

function getUser(id) {
  return new Promise((reslove, rej) => {
    let query = { _id: ObjectId(id) };
    findOne(usercollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function getUserByUsername(username) {
  return new Promise((reslove, rej) => {
    let query = { username };
    findOne(usercollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = {
  adduser,
  getUser,
  getUserByUsername
};