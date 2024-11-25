const router = require("express").Router();

const {
  addImage1,
  downloadDoc,
  streamVideo,
  } = require("../controllers/UploadCtrl");
const upload = require("../middlewares/uploadImage")

router.post("/add", upload.single("file"), addImage1);
router.get("/:filename", downloadDoc);
router.get("/video/:filename", streamVideo);

module.exports = router;
