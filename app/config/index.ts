export type EnvType = "development" | "staging" | "production" | "test"

export const NODE_ENV: EnvType = (process.env.NODE_ENV as EnvType) || "development"

export const APP_ENV: EnvType = (process.env.APP_ENV as EnvType) || NODE_ENV

export const APP_NAME = process.env.APP_NAME || "Blitz+Chakra"

export const APP_ORIGIN = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

export const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY

export const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS

export const COMPANY_ADDRESS = process.env.COMPANY_ADDRESS

// Helpers
export const SEND_EMAILS_IN_DEV = true
export const IS_PROD = APP_ENV === "production"
export const IS_DEV = ["development", "staging"].includes(APP_ENV)
export const IS_TEST = process.env.NODE_ENV === "test"
