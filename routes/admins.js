const router = require('express').Router();
const {
  register,
  login,
  confirmAuth,
  getAllAdmins,
  getAdminById,
  getByIdAndUpdate,
  deleteAdmin,
} = require('../controllers/admins');
const { checkAdminAuth } = require('../middleware/adminAuth');

// Admin Register
router.get('/', getAllAdmins);
router.get('/auth', checkAdminAuth, confirmAuth);
router.get('/:id', getAdminById);
router.put('/:id', getByIdAndUpdate);

router.delete('/:id', deleteAdmin);

router.post('/', register);
router.post('/login', login);

module.exports = router;
