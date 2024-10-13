/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["127.0.0.1", "localhost", "go-auth-backend-fr6g.onrender.com"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
