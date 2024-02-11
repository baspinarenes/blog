const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "NEXT_LOCALE",
            value: "en",
          },
        ],
        permanent: true,
        destination: "/en",
      },
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "NEXT_LOCALE",
            value: "tr",
          },
        ],
        permanent: true,
        destination: "/tr",
      },
    ];
  },
};

module.exports = withNextIntl(config);
