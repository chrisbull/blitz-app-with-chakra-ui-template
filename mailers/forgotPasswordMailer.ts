import {
  APP_NAME,
  APP_ORIGIN,
  FROM_EMAIL_ADDRESS,
  IS_PROD,
  NODE_ENV,
  POSTMARK_API_KEY,
  SEND_EMAILS_IN_DEV,
} from "app/config"
import * as postmark from "postmark"
import previewEmail from "preview-email"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = APP_ORIGIN

  const resetUrl = `${origin}/reset-password?token=${token}`

  if (FROM_EMAIL_ADDRESS === undefined) {
    throw new Error("FROM_EMAIL_ADDRESS is not set")
  }

  return {
    async send() {
      if (NODE_ENV !== "test" && (IS_PROD || SEND_EMAILS_IN_DEV) && POSTMARK_API_KEY) {
        const client = new postmark.ServerClient(POSTMARK_API_KEY)
        await client.sendEmailWithTemplate({
          From: FROM_EMAIL_ADDRESS!,
          To: to,
          TemplateAlias: "password-reset",
          TemplateModel: {
            product_url: origin,
            product_name: APP_NAME,
            name: to,
            action_url: resetUrl,
            company_name: APP_NAME,
            company_address: "123 Something St. San Francisco, CA 94123",
          },
        })
      } else {
        // Preview email in the browser
        await previewEmail({
          from: FROM_EMAIL_ADDRESS,
          to,
          subject: "Your Password Reset Instructions",
          html: `
            <h1>${APP_NAME}</h1>
            <h2>Reset Your Password</h2>

            <a href="${resetUrl}">
              Click here to set a new password
            </a>
          `,
        })
      }
    },
  }
}
