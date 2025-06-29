const express = require("express");
const router = express.Router();
const Product = require("../../models/products"); // adjust path if needed

const BASE_URL = "https://afkit.ng";

router.get("/sitemap.xml", async (req, res) => {
  try {
    const products = await Product.find({}, "_id updatedAt").lean();
    const now = new Date().toISOString();

    const staticPages = [
      { loc: `${BASE_URL}/shop/home`, lastmod: now, priority: 1.0 },
      { loc: `${BASE_URL}/shop/listing`, lastmod: now, priority: 0.9 },
      { loc: `${BASE_URL}/shop/about`, lastmod: now, priority: 0.7 },
    ];

    const productUrls = products.map(product => ({
      loc: `${BASE_URL}/shop/product/${product._id}`,
      lastmod: product.updatedAt?.toISOString() || now,
      priority: 0.8
    }));

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...productUrls].map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>
`).join('')}
</urlset>`;

    res.header('Content-Type', 'text/xml');
    res.send(sitemapXml);
  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;
