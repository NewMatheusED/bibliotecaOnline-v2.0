import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["books.google.com", "profilepicturesbibliotecabucket.s3.sa-east-1.amazonaws.com"],
  },
};

export default nextConfig;