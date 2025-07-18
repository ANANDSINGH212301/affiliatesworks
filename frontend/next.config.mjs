/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "host",
            value: "www.program.affiliatesworks.com",
          },
        ],
        destination: "https://program.affiliatesworks.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
