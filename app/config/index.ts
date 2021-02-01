export const APP_NAME = 'Blitz+Chakra'

export const {
  NODE_ENV = 'development',
  APP_ENV = 'development',
  POSTMARK_SERVER_KEY = 'POSTMARK_SERVER_KEY',
  FROM_EMAIL = 'FROM_EMAIL',
} = process.env || {}

export const DEV_SEND_EMAILS = Boolean(process.env.DEV_SEND_EMAILS)

export const IS_PRODUCTION = APP_ENV === 'production'

export const DEV_EMAIL_OPTIONS: any = {
  host: 'localhost',
  port: 1025,
  secure: false,
  debug: true,
  ignoreTLS: true,
}

export const S3_CONFIG = {
  signatureVersion: 'v4',
  region: 'us-west-1',
}

export const S3_URL = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/`

export const FULL_WEB_URL = `${IS_PRODUCTION ? 'https://' : 'http://'}${WEB_URL}`
