const userModel = require('../../db/user.model');
const crypto = require("crypto");
const { generateJwt } = require("../../middleware/auth");

const secret = process.env.secret || "salt";


const loginUser = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  userModel.getUserByUsername(username)
    .then(data => {
      const encryptedPass = crypto.pbkdf2Sync(password.trim(), secret.trim(), 2000, 64, "sha512").toString('hex');
      if (encryptedPass == data.password) {
        const token = generateJwt({ username, _id: data._id });
        if (token) {
          return res.status(200).send({ msg: "Success", token });
        }
        return response.other(500, { msg: "Fail to login" });
      }
      return res.status(403).send();
    }).catch(err => {
      return res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

module.exports = {
  loginUser
}
