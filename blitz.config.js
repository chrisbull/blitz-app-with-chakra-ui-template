const { sessionMiddleware, simpleRolesIsAuthorized } = require('@blitzjs/server')

module.exports = {
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  experimental: {
    reactMode: 'legacy',
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    APP_SECRET: process.env.APP_SECRET,
    POSTMARK_SERVER_KEY: process.env.POSTMARK_SERVER_KEY,
    APP_ORIGIN: process.env.APP_ORIGIN,
    DEV_SEND_EMAILS: process.env.DEV_SEND_EMAILS,
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
