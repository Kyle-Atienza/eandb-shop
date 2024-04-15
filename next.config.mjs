/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BASE_URL: "http://localhost:4040",
  },
};

export default nextConfig;
