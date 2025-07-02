const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔍 GET /search?name=&industry=
router.get('/', async (req, res) => {
  const { name, industry } = req.query;

  try {
    let query = db('companies');

    if (name) {
      query = query.whereILike('name', `%${name}%`);
    }

    if (industry) {
      query = query.whereILike('industry', `%${industry}%`);
    }

    const results = await query.select('id', 'name', 'industry', 'description', 'image_url');

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});

module.exports = router;
