const express = require('express');
const multer = require('multer');
const supabase = require('../supabaseclient');
const authenticate = require('../middlewares/jwt');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/logo', authenticate, upload.single('logo'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  const fileExt = file.originalname.split('.').pop();
  const fileName = `company-${req.user.id}-${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
  .from('company-logs')
  .upload(fileName, file.buffer, { contentType: file.mimetype });

if (error) return res.status(500).json({ error: error.message });

const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/company-logs/${fileName}`;

res.json({ url: publicUrl });

});

module.exports = router;
