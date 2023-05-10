const db = require("./mongo");


function insert(table, data) {
  return new Promise((reslove, rej) => {
    try {
      db.get()
        .collection(table)
        .insertOne(data, function (err, res) {
          if (err) rej(err);
          console.log("Number of documents inserted: " + res?.insertedCount);
          reslove(res);
        });
    } catch (err) {
      rej(err);
    }
  });
}

function insertMany(table, data) {
  return new Promise((reslove, rej) => {
    try {
      db.get()
        .collection(table)
        .insertMany(data, function (err, res) {
          if (err) rej(err);
          console.log("Number of documents inserted: " + res.insertedCount);
          reslove(res);
        });
    } catch (err) {
      rej(err);
    }
  });
}

function findOne(table, query) {
  return new Promise((reslove, rej) => {
    try {
      db.get()
        .collection(table)
        .findOne(query, function (err, res) {
          if (err) rej(err);
          reslove(res);
        });
    } catch (err) {
      rej(err);
    }
  })
}

function findMany(table, query) {
  return new Promise((reslove, rej) => {
    try {
      db.get()
        .collection(table)
        .find(query).sort({ timestamp: -1 }).toArray(function (err, res) {
          if (err) rej(err);
          reslove(res);
        })
    } catch (err) {
      rej(err);
    }
  })
}

function updateOne(table, query, setter) {
  return new Promise((reslove, rej) => {
    try {
      db.get()
        .collection(table)
        .updateOne(query, setter, function (err, res) {
          if (err) rej(err);
          console.log("Number of documents updated: " + res);
          reslove(res);
        });
    } catch (err) {
      rej(err);
    }
  });
}

function deleteOne(table, query) {
  return new Promise((reslove, rej) => {
    try {
      db.get()
        .collection(table)
        .deleteOne(query, function (err, res) {
          if (err) rej(err);
          console.log("Number of documents updated: " + res);
          reslove(res);
        });
    } catch (err) {
      rej(err);
    }
  });
}

module.exports = {
  insert,
  insertMany,
  findMany,
  findOne,
  updateOne,
  deleteOne
}