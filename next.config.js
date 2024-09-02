module.exports = {
  // future: {
  //   webpack5: true,
  //   strictPostcssConfiguration: true,
  // },
  images: {
    domains: ['v5.airtableusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: "/assets/thumb/:path*",
        destination: "https://dl.airtable.com/.attachmentThumbnails/:path*",
      },
      {
        source: "/resource/a3439b7e-5470-47f5-ba22-96057925afdc/:path*",
        destination: "https://umami-dojo.vercel.app/:path*",
      },
      {
        source: "/resource/d9806b0d-b755-41bc-9929-6ef05f163266",
        destination: "https://umami-dojo.vercel.app/umami.js",
      },
      {
        source: "/:slug/teste",
        destination: "/:slug/trial",
      },
    ];
  },
};
