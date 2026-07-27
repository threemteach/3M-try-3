import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "usryiclmtasvhydvafsa.supabase.co",
        pathname: "/storage/v1/object/public/project-images/**",
      },
    ],
  },
};

export default nextConfig;
