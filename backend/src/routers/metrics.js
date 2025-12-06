// backend/src/routers/metrics.js
const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");

router.get("/:tenantId", async (req, res) => {
  try {
    const tenantId = parseInt(req.params.tenantId);

    // ----- BASIC COUNTS -----
    const totalCustomers = await prisma.customer.count({
      where: { tenantId }
    });

    const totalOrders = await prisma.order.count({
      where: { tenantId }
    });

    const totalProducts = await prisma.product.count({
      where: { tenantId }
    });

    const revenueAgg = await prisma.order.aggregate({
      where: { tenantId },
      _sum: { totalPrice: true }
    });

    const revenue = revenueAgg._sum.totalPrice || 0;

    // ----- ORDERS PER DAY -----
    const orders = await prisma.order.findMany({
      where: { tenantId },
      orderBy: { createdAt: "asc" }
    });

    const byDate = {};
    orders.forEach(o => {
      const d = o.createdAt.toISOString().slice(0, 10);
      byDate[d] = (byDate[d] || 0) + 1;
    });

    const orderDates = Object.keys(byDate).map(date => ({
      date,
      count: byDate[date]
    }));

    // ----- TOP CUSTOMERS DISABLED (no customerId in schema) -----
    const topCustomers = [];

    // ----- FINAL RESPONSE -----
    res.json({
      totalCustomers,
      totalOrders,
      totalProducts,
      revenue,
      orderDates,
      topCustomers
    });

  } catch (err) {
    console.error("METRICS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;   // <----- VERY IMPORTANT

