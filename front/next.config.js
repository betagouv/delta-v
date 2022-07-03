const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/simulateur/configuration',
        destination: '/simulateur/configuration/etape0',
        permanent: true,
      },
      {
        source: '/simulateur',
        destination: '/simulateur/configuration/etape0',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const rewritesUrls = [];
    if (process.env.NODE_ENV === 'development') {
      rewritesUrls.push({
        source: '/api/:path*',
        destination: 'http://backend-api-delta-v:8080/api/:path*',
      });
    }
    return rewritesUrls;
  },
});
