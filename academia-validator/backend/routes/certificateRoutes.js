const router = require('express').Router();
const certificateController = require('../controllers/certificateController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/verify', certificateController.verify);
router.post('/upload-verify', upload.single('file'), certificateController.uploadVerify);
router.post('/', authenticate, authorize(['institution_admin']), certificateController.addCertificate);

module.exports = router;