// Init
const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/imageUpload');
const singleUpload = upload.array('files');
const {
  createDraft,
  updateDraft,
  getDrafts,
  deleteDraft
} = require('../controllers/draft');

// Routes

router.post('/', createDraft);
router.put('/', auth, updateDraft);
router.get('/:id', getDrafts);
router.delete('/:id', auth, deleteDraft);

// Export
module.exports = router;
