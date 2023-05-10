const userModel = require('../../db/user.model');
const crypto = require("crypto");
const secret = process.env.secret || "salt";


const createUser = (req, res) => {
  const payload = req.body;
  console.log(payload);
  payload.password = crypto.pbkdf2Sync(payload.password, secret, 2000, 64, "sha512").toString('hex');

  userModel.adduser(payload)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const getUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  userModel.getUser(id)
    .then(data => {
      console.log(data);
      res.status(200).send({ msg: "Success user exist" });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

module.exports = {
  createUser,
  getUser,
}
