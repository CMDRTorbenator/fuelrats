/* eslint-env node */

// Constants
const DEFAULT_PORT = 3000





function getEnv () {
  return {
    isDev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || DEFAULT_PORT,
    proxyEnabled: process.env.FRDC_PROXIED ?? process.env.NODE_ENV === 'production',
    publicUrl: process.env.FRDC_PUBLIC_URL ?? `http://localhost:${process.env.PORT ?? DEFAULT_PORT}`,
    fallbackUrl: process.env.FRDC_FALLBACK_URL ?? 'https://fallback.fuelrats.com/',
    api: {
      clientId: process.env.FRDC_API_KEY,
      clientSecret: process.env.FRDC_API_SECRET,
      url: process.env.FRDC_API_URL ?? 'http://localhost:8080',
    },
    edsm: {
      url: process.env.FRDC_EDSM_API_URL ?? 'https://www.edsm.net',
    },
    wordpress: {
      url: process.env.FRDC_WORDPRESS_URL ?? 'https://wordpress.fuelrats.com',
    },
    stripe: {
      secret: process.env.FRDC_STRIPE_API_SK,
      bansFile: process.env.FRDC_STRIPE_BANS_FILE,
    },
  }
}





export default getEnv
