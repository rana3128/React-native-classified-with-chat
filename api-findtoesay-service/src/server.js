require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./routes/base');
const app = express();
const db = require("./db/mongo");

db.connect((err) => {
  if (err) console.log("error in connection MongoDB", err)
});

app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server is running os port' + port));
