const prisma = require("../../prisma/client");
const { fetchFromShopify } = require("../shopifyService");

async function ingest(req, res) {
  try {
    const tenantId = parseInt(req.params.tenantId);
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });

    if (!tenant) return res.status(404).json({ error: "Tenant not found" });

    const data = await fetchFromShopify(tenant);

    // ----- CUSTOMERS -----
    for (const c of data.customers) {
      await prisma.customer.upsert({
        where: { shopifyId: String(c.id) },
        update: {
          email: c.email,
          firstName: c.first_name,
          lastName: c.last_name
        },
        create: {
          tenantId,
          shopifyId: String(c.id),
          email: c.email,
          firstName: c.first_name,
          lastName: c.last_name
        }
      });
    }

    // ----- PRODUCTS -----
    for (const p of data.products) {
      await prisma.product.upsert({
        where: { shopifyId: String(p.id) },
        update: {
          title: p.title,
          price: parseFloat(p.variants?.[0]?.price || 0)
        },
        create: {
          tenantId,
          shopifyId: String(p.id),
          title: p.title,
          price: parseFloat(p.variants?.[0]?.price || 0)
        }
      });
    }

    // ----- ORDERS -----
    // ----- ORDERS -----
for (const o of data.orders) {
  await prisma.order.upsert({
    where: { shopifyId: String(o.id) },
    update: {
      totalPrice: parseFloat(o.total_price || 0),
      createdAt: new Date(o.created_at)
    },
    create: {
      tenantId,
      shopifyId: String(o.id),
      totalPrice: parseFloat(o.total_price || 0),
      createdAt: new Date(o.created_at)
    }
  });
}


    res.json({
      message: "Ingestion complete",
      counts: {
        customers: data.customers.length,
        products: data.products.length,
        orders: data.orders.length
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { ingest };