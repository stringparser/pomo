/* eslint-disable @typescript-eslint/no-var-requires */
// next.config.js
const withPlugins = require('next-compose-plugins');
const offline = require('next-offline');

const nextConfig = {
  // Exposes Server ENV Vars To Client Using Webpack
  // env: {
  //   AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  //   AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  // },
  target: process.env.NODE_ENV !== 'production' ? 'server' : 'serverless',
  devSwSrc: './public/sw.js',
  generateSw: false,
  dontAutoRegisterSw: true,
  workboxOpts: {
    swSrc: './public/sw.js',
    swDest: './public/service-worker.js',
  },
};

module.exports = withPlugins([[offline]], nextConfig);
