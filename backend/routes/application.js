const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middlewares/jwt');

// 🔸 POST /apply → Submit a proposal
router.post('/', authenticate, async (req, res) => {
  const { tender_id, proposal_text } = req.body;

  try {
    // Get the logged-in user's company
    const company = await db('companies').where({ user_id: req.user.id }).first();
    if (!company) return res.status(404).json({ message: 'Company not found' });

    // Check if tender exists
    const tender = await db('tenders').where({ id: tender_id }).first();
    if (!tender) return res.status(404).json({ message: 'Tender not found' });

    // Prevent companies from applying to their own tenders
    if (tender.company_id === company.id) {
      return res.status(403).json({ message: "You can't apply to your own tender" });
    }

    // Check if already applied
    const existing = await db('applications')
      .where({ tender_id, company_id: company.id })
      .first();
    if (existing) {
      return res.status(400).json({ message: 'Already applied to this tender' });
    }

    const [application] = await db('applications')
      .insert({ tender_id, company_id: company.id, proposal_text })
      .returning('*');

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply', details: err.message });
  }
});

// 🔸 GET /applications/:tenderId → Get all applications for a tender
router.get('/:tenderId', authenticate, async (req, res) => {
  const tenderId = req.params.tenderId;

  try {
    // Get user's company
    const company = await db('companies').where({ user_id: req.user.id }).first();
    if (!company) return res.status(404).json({ message: 'Company not found' });

    // Check if tender belongs to their company
    const tender = await db('tenders')
      .where({ id: tenderId, company_id: company.id })
      .first();

    if (!tender) {
      return res.status(403).json({ message: 'You do not own this tender' });
    }

    const applications = await db('applications')
      .where({ tender_id: tenderId })
      .join('companies', 'applications.company_id', '=', 'companies.id')
      .select(
        'applications.id',
        'applications.proposal_text',
        'applications.created_at',
        'companies.name as applicant_company',
        'companies.industry'
      );

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications', details: err.message });
  }
});

module.exports = router;
