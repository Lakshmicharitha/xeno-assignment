require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ingestRouter = require('./routers/ingest');
const metricsRouter = require('./routers/metrics');
const tenantRouter = require('./routers/tenants');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ingest', ingestRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/tenants', tenantRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
