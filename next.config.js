/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: './',
  trailingSlash: true,
  compiler: { styledComponents: true },
};

module.exports = nextConfig;
