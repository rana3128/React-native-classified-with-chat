const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";

const generateJwt = (userData) => {
  const data = userData || {};
  console.log(data, jwtSecret);
  const token = jwt.sign(data, jwtSecret, { expiresIn: "7d" });
  if (token) {
    return token;
  }
  return null;
};

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      console.log(token, jwtSecret);
      const decoded = jwt.verify(token, jwtSecret);
      if (decoded) {
        req.userData = decoded;
        return next();
      }
      return res.send({ status: "fail", msg: "Unauthrize, Invalid token" }).status(403);
    } else {
      return res.send({ status: "fail", msg: "Unauthrize, Please add token in header.Authrization" }).status(403);
    }
  } catch (err) {
    console.log(err);
    return res.send({ status: "fail", msg: err }).status(403);
  }
};

module.exports = {
  generateJwt,
  verifyJWT
}