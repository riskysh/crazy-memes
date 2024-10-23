/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ik.imagekit.io",
          port: "",
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
