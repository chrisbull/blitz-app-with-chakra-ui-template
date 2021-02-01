export const APP_NAME = 'Blitz+Chakra'

export const {
  NODE_ENV = 'development',
  APP_ENV = 'development',
  POSTMARK_SERVER_KEY = 'POSTMARK_SERVER_KEY',
  FROM_EMAIL = 'FROM_EMAIL',
} = process.env || {}

export const DEV_SEND_EMAILS = Boolean(process.env.DEV_SEND_EMAILS)

export const IS_PRODUCTION = APP_ENV === 'production'
