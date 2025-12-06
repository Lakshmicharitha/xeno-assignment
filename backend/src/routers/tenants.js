const express = require('express');
const router = express.Router();
const prisma = require('../../prisma/client');

// create a tenant
router.post('/', async (req, res) => {
  const { name, storeUrl, apiKey, password } = req.body;
  try {
    const t = await prisma.tenant.create({
      data: { name, storeUrl, apiKey, password }
    });
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list tenants
router.get('/', async (req, res) => {
  const tenants = await prisma.tenant.findMany();
  res.json(tenants);
});

module.exports = router;
