const express = require ('express');
const router = express.Router ();
const multer  = require('multer');
const path = require ('path')
const userController = require ('../controllers/userController');
//const guestMiddleware = require('../middlewares/userLoggedMidleware');
//const loggedMiddleware = require('../middlewares/logMiddleware');

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

router.get('/login',userController.login);
router.get('/register',userController.register);
router.get('/user/:id',userController.perfil);
router.get('/user/:id/edit',userController.edit);
router.get("/contact", userController.contact);
router.get("/logout", userController.logout)

router.post('/register',upload.single("image"),userController.createUser);
 
router.put('user/:id',upload.single("image"),userController.actualizar);
  
  



module.exports = router;