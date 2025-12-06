const axios = require("axios");

async function fetchFromShopify(tenant) {
  const base = `https://${tenant.storeUrl}/admin/api/2024-04`;
  const headers = {
    "X-Shopify-Access-Token": tenant.password,
  };

  // Safe GET function to avoid crashing
  async function safeGet(url) {
    try {
      const res = await axios.get(url, { headers, timeout: 8000 });
      return res.data;
    } catch (err) {
      console.log("Shopify API error:", err.message);
      return null;
    }
  }

  // Fetching from Shopify APIs
  const customersData = await safeGet(`${base}/customers.json`);
  const ordersData = await safeGet(`${base}/orders.json`);
  const productsData = await safeGet(`${base}/products.json`);

  return {
    customers: customersData?.customers || [],
    orders: ordersData?.orders || [],
    products: productsData?.products || [],
  };
}

module.exports = { fetchFromShopify };
