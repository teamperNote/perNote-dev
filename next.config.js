/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/personal-survey/gender",
        destination: "/personal-survey/start",
        permanent: true,
      },
      {
        source: "/personal-survey/concentration",
        destination: "/personal-survey/start",
        permanent: true,
      },
      {
        source: "/personal-survey/season",
        destination: "/personal-survey/start",
        permanent: true,
      },
      {
        source: "/personal-survey/color",
        destination: "/personal-survey/start",
        permanent: true,
      },
      {
        source: "/personal-survey/personality",
        destination: "/personal-survey/start",
        permanent: true,
      },
      {
        source: "/personal-survey/feature",
        destination: "/personal-survey/start",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
