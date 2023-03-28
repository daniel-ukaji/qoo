/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  allowFutureImage: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "veezahrepo.s3.amazonaws.com",
        pathname: "/account123/**",
      },
    ],
    domains: [
      "links.papareact.com",
      "a0.muscache.com",
      "ibb.co",
      "i.ibb.co",
      "veezahrepo.s3.amazonaws.com",
      "upload.wikimedia.org",
      "media.wired.com",
      "ichef.bbci.co.uk",
      "wallpapers.com",
      "www.google.com",
      "apvertise-repo.s3.amazonaws.com",
    ],
  },
};
