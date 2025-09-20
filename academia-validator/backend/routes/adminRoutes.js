const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/analytics', authenticate, authorize(['admin']), adminController.analytics);
router.post('/institutions', authenticate, authorize(['admin']), adminController.addInstitution);

module.exports = router;