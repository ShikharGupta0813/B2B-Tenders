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

router.get('/tenders', async (req, res) => {
  const { min_budget, max_budget } = req.query;

  try {
    let query = db('tenders');

    if (min_budget) {
      query = query.where('budget', '>=', Number(min_budget));
    }

    if (max_budget) {
      query = query.where('budget', '<=', Number(max_budget));
    }

    const tenders = await query.select('*').orderBy('created_at', 'desc');

    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tenders', details: err.message });
  }
});

module.exports = router;
