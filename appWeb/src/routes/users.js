const express = require ("express");
const router = express.Router ();
const path = require ("path")
const userController = require ("../controllers/userController");

const logDBMiddleware = require("../middlewares/logDBMiddleware");
const guestMiddleware = require('../middlewares/guestMiddleware');
const loggedMiddleware = require('../middlewares/loggedMiddleware');


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


 
  router.get("/register", guestMiddleware, userController.register);
  router.get("/contact", userController.contact);
  router.get("/login",guestMiddleware, userController.login);
  router.get("/profile", loggedMiddleware, userController.profile);
  router.get("/logout", userController.logout)


module.exports = router;