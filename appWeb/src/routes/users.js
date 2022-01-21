const express = require ('express');
const router = express.Router ();
const multer  = require('multer');
const path = require ('path');
const userController = require ('../controllers/userController.js');
const validacionesUser = require('../middlewares/validations/RegisterValidator.js');
const validacionesLogin =  require('../middlewares/validations/LoginValidator.js');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/uploads/users'));
    },
    filename: function (req, file, cb) {
      const newFilename = 'user-' + Date.now() + path.extname(file.originalname);
      cb(null,newFilename);
    }
  })
const upload = multer({ storage: storage })

router.get('/register',guestMiddleware ,userController.register);
router.get('/login',guestMiddleware,userController.login);
router.get("/profile",authMiddleware,userController.profile)
router.get('/user/:id/edit',userController.edit);
router.get("/contact", userController.contact);
router.get("/logout", userController.logout);

router.post('/register',upload.single("image"),validacionesUser, userController.createUser);
router.post('/login',validacionesLogin,userController.processLogin);

router.put('/user/:id',upload.single("image"),userController.actualizar);

module.exports = router;