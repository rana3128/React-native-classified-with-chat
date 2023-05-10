const classifiedModel = require('../../db/classified.model');
const AWS = require("aws-sdk");

const createClassified = (req, res) => {
  const payload = req.body;
  payload.userId = req.userData._id;
  payload.isActive = true;
  payload.timestamp = new Date().getTime();
  classifiedModel.create(payload)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const getUserClassifieds = (req, res) => {
  const userId = req.userData._id;
  classifiedModel.getUser(userId)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail Getting user ads", error: JSON.stringify(err) });
    });
}

const getCatagoryClassifieds = (req, res) => {
  const cat = req.params.cat;
  classifiedModel.getCatagory(cat)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const getClassified = (req, res) => {
  const id = req.params.id;
  classifiedModel.get(id)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const activaAction = (req, res) => {
  const { id, action } = req.params;
  const userId = req.userData._id
  classifiedModel.activeAction(id, userId, action == "true")
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const deleteClassified = (req, res) => {
  const { id } = req.params;
  const userId = req.userData._id
  classifiedModel.deleteUserAds(id, userId)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const update = (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const userId = req.userData._id
  classifiedModel.update(id, userId, payload)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const searchClassified = (req, res) => {
  const key = req.params.key;
  classifiedModel.search(key)
    .then(data => {
      res.status(200).send({ msg: "Success", data });
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const uploadImage = async (req, res) => {
  const { file } = req;
  const { adsId } = req.body
  const userId = req.userData._id

  if (!adsId) return res.status(503).send({ msg: "Ads id required" });
  if (!file?.buffer) return res.status(503).send({ msg: "Invalid file!" });

  try {
    console.log(file, adsId);
    const tsp = new Date().getTime();
    let imgFortmat = file.mimetype.split("/");
    imgFortmat = imgFortmat[imgFortmat.length - 1];
    const s3 = new AWS.S3({
      accessKeyId: process.env.awsAccessKeyId,
      secretAccessKey: process.env.awsSecretAccessKey,
      region: "ap-south-1"
    })

    const uploadedImage = await s3.upload({
      Bucket: "findtoeasy",
      Key: `classified/${adsId}_${tsp}.${imgFortmat}`,
      Body: file.buffer,
    }).promise()

    const payload = { image: uploadedImage.Location }
    classifiedModel.update(adsId, userId, payload)
      .then(data => {
        res.status(200).send({ msg: "Success", data });
      }).catch(err => {
        res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
      });
  } catch (error) {
    res.status(500).send({ msg: "Fail", error });
  }
}



module.exports = {
  createClassified,
  getUserClassifieds,
  getCatagoryClassifieds,
  getClassified,
  searchClassified,
  activaAction,
  update,
  uploadImage,
  deleteClassified
}
