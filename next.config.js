const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = withNextIntl(config);
