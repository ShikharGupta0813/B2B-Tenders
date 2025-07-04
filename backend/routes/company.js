const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middlewares/jwt');

// 🔸 POST /company → Create a new company profile
router.post('/', authenticate, async (req, res) => {
  const {
    name,
    industry,
    description,
    image_url,
    website_url,
    contact_email,
    phone_number,
    services,
  } = req.body;

  try {
    const existing = await db('companies').where({ user_id: req.user.id }).first();
    if (existing) {
      return res.status(400).json({ message: 'Company profile already exists' });
    }

    const [company] = await db('companies')
      .insert({
        user_id: req.user.id,
        name,
        industry,
        description,
        image_url,
        website_url,
        contact_email,
        phone_number,
        services,
      })
      .returning('*');

    res.status(201).json(company);
  } catch (err) {
    console.error('Error creating company:', err);
    res.status(500).json({ error: 'Failed to create company', details: err.message });
  }
  
});

// 🔸 GET /company → Get logged-in user’s company profile
router.get('/', authenticate, async (req, res) => {
  try {
    const company = await db('companies').where({ user_id: req.user.id }).first();
    if (!company) return res.status(404).json({ message: 'Company not found' });

    res.json(company);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch company', details: err.message });
  }
});

// 🔸 PUT /company → Update logged-in user’s company profile
router.put('/', authenticate, async (req, res) => {
  const {
    name,
    industry,
    description,
    image_url,
    website_url,
    contact_email,
    phone_number,
    services,
  } = req.body;

  try {
    const updated = await db('companies')
      .where({ user_id: req.user.id })
      .update({
        name,
        industry,
        description,
        image_url,
        website_url,
        contact_email,
        phone_number,
        services,
      })
      .returning('*');

    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update company', details: err.message });
  }
});

// 🔸 GET /company/:companyId → Fetch company profile by companyId
router.get('/:companyId', async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await db('companies').where({ id: companyId }).first();
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

module.exports = router;
