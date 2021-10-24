const express = require ("express");
const router = express.Router ();
const path = require ("path")
const userController = require ("../controllers/userController");

const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve (__dirname, "../../public/images/uploads/users") )
    },
    filename: function (req, file, cb) {
      cb(null, "user" + '-' + Date.now() + path.extname(file.originalname))
    }
  })
const upload = multer({ storage: storage })
module.exports = router;