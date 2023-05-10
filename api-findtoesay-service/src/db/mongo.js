const env = process.env.NODE_ENV || "local";
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = process.env.mongoUri || "mongodb://localhost:27017/findtoeasy"

let state = { db: null };

exports.connect = async (callback) => {
  if (state.db) return callback();
  await MongoClient.connect(url, (err, connection) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    state.db = connection;//assign the connection object
    console.log(`MongoDB Connected----------------------------`);
    return callback();
  })
}

exports.get = () => { return state.db.db("findtoeasy") }

exports.close = (callback) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      state.mode = null;
      return callback(err);
    })
  }
}