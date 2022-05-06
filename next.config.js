// next.config.js

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// module.exports = withBundleAnalyzer({});

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/depot",
        destination: "https://private-kuenstlernachlaesse-brandenburg.de/depot",
        permanent: false,
      },
      {
        source: "/",
        destination: "https://private-kuenstlernachlaesse-brandenburg.de",
        permanent: false,
      },
    ];
  },
};
