/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
      },
      {
        hostname: "miro.medium.com"
      },
      {
        hostname: "videos.ctfassets.net"
      },
      {
        hostname: "hardtec.com.br"
      }
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
