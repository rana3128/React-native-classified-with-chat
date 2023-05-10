const {
  insert,
  insertMany,
  findMany,
  findOne,
  updateOne,
  deleteOne
} = require("./query");

const { ObjectId } = require('mongodb');
const classifiedCollection = "classified"


function create(data) {
  return new Promise((reslove, rej) => {
    insert(classifiedCollection, data)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        rej(err);
        console.log(err);
      });
  });
}

function get(id) {
  return new Promise((reslove, rej) => {
    let query = { _id: ObjectId(id) };
    findOne(classifiedCollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
}

function getCatagory(catagory) {
  return new Promise((reslove, rej) => {
    let query = { catagory };
    findMany(classifiedCollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
}

function getUser(userId) {
  return new Promise((reslove, rej) => {
    let query = { userId };
    findMany(classifiedCollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
}

function search(key) {
  return new Promise((reslove, rej) => {
    let query = {
      $or: [
        { title: { '$regex': `.*${key}.*`, '$options': 'i' } },
        { description: { '$regex': `.*${key}.*`, '$options': 'i' } }
      ]
    }
    findMany(classifiedCollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
}

const activeAction = (id, userId, isActive) => {
  return new Promise((reslove, rej) => {
    let query = { _id: ObjectId(id), userId };
    let update = { $set: { isActive, updatedAt: new Date().getTime() } };
    updateOne(classifiedCollection, query, update)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  })
}

const deleteUserAds = (id, userId) => {
  return new Promise((reslove, rej) => {
    let query = { _id: ObjectId(id), userId };
    deleteOne(classifiedCollection, query)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  })
}

const update = (id, userId, data) => {
  return new Promise((reslove, rej) => {
    let query = { _id: ObjectId(id), userId };
    let update = { $set: { ...data, updatedAt: new Date().getTime() } };
    updateOne(classifiedCollection, query, update)
      .then((res) => {
        reslove(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  })
}

module.exports = {
  create,
  get,
  getCatagory,
  getUser,
  search,
  activeAction,
  update,
  deleteUserAds
};