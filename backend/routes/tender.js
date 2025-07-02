const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middlewares/jwt');

// 🔸 POST /tenders → Create a new tender
router.post('/', authenticate, async (req, res) => {
  const { title, description, deadline, budget } = req.body;
  try {
    // Get company ID of the logged-in user
    const company = await db('companies').where({ user_id: req.user.id }).first();
    if (!company) return res.status(404).json({ message: 'Company profile not found' });

    const [tender] = await db('tenders')
      .insert({
        company_id: company.id,
        title,
        description,
        deadline,
        budget,
      })
      .returning('*');

    res.status(201).json(tender);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create tender', details: err.message });
  }
});

// 🔸 GET /tenders → List all tenders (paginated)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const tenders = await db('tenders')
      .select('*')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tenders', details: err.message });
  }
});

// 🔸 GET /tenders/company/:companyId → Get tenders by company
router.get('/company/:companyId', async (req, res) => {
  try {
    const tenders = await db('tenders')
      .where({ company_id: req.params.companyId })
      .orderBy('created_at', 'desc');

    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch company tenders', details: err.message });
  }
});

module.exports = router;
