const express = require('express');
const router = express.Router();
const { ingest } = require('../controllers/ingestController');

router.post('/:tenantId', ingest);

module.exports = router;
