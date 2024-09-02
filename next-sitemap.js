module.exports = {
  siteUrl: "https://school.dojo.plus",
  generateRobotsTxt: true,
  exclude: [
    "/school-sitemap.xml",
    "/location-sitemap.xml",
    "/schedule-sitemap.xml",
    "/trial-sitemap.xml",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://school.dojo.plus/sitemap.xml",
      "https://school.dojo.plus/location-sitemap.xml",
      "https://school.dojo.plus/schedule-sitemap.xml",
      "https://school.dojo.plus/trial-sitemap.xml",
    ],
  },
};
