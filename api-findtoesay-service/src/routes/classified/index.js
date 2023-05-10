const express = require('express');
const classifiedHandler = require("./handler");
const { requestValidator } = require("../../middleware/validator/request.validator");
const { verifyJWT } = require("../../middleware/auth");
const multer = require('multer');
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const upload = multer({ storage, fileFilter });

router = express.Router();

router.get("/v1/classified/user", requestValidator, verifyJWT, classifiedHandler.getUserClassifieds);
router.get("/v1/classified/catagory/:cat", requestValidator, classifiedHandler.getCatagoryClassifieds);
router.get("/v1/classified/search/:key", requestValidator, classifiedHandler.searchClassified);
router.get("/v1/classified/active/:id/action/:action", requestValidator, verifyJWT, classifiedHandler.activaAction);
router.delete("/v1/classified/delete/:id", requestValidator, verifyJWT, classifiedHandler.deleteClassified);
router.get("/v1/classified/:id", requestValidator, classifiedHandler.getClassified);

router.post("/v1/classified/update/:id", requestValidator, verifyJWT, classifiedHandler.update);
router.post("/v1/classified", requestValidator, verifyJWT, classifiedHandler.createClassified);

router.put("/v1/upload/image", verifyJWT, upload.single('adsImage'), classifiedHandler.uploadImage)


module.exports = router;