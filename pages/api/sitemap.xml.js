import { db } from "../../utils/firebase";
import { ref, get } from "firebase/database";

export default async function handler(req, res) {
  try {
    const articlesRef = ref(db, "articles");
    const snapshot = await get(articlesRef);
    const articlesData = snapshot.val();

    // Base URL of your site, adjust accordingly
    const baseUrl = process.env.SITE_URL || "https://yourdomain.com";

    // Collect all URLs: homepage + articles URLs
    const urls = [];

    // Add homepage
    urls.push(`${baseUrl}/`);

    // Loop through categories and articles
    if (articlesData) {
      Object.keys(articlesData).forEach((category) => {
        Object.keys(articlesData[category]).forEach((id) => {
          urls.push(`${baseUrl}/article/${id}`);
        });
      });
    }

    // Generate XML string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

    res.status(200).setHeader("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }
}
