/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URI || "http://localhost:3000",
  generateRobotsTxt: true,
  // generateIndexSitemap: false,
};
