import {
  APP_NAME,
  DEV_SEND_EMAILS,
  FROM_EMAIL,
  IS_PRODUCTION,
  POSTMARK_SERVER_KEY,
} from 'app/config'
import * as postmark from 'postmark'
import previewEmail from 'preview-email'

type ResetPasswordMailer = {
  to: string
  token: string
}

const client = new postmark.ServerClient(POSTMARK_SERVER_KEY)

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset-password?token=${token}`

  return {
    async send() {
      if (IS_PRODUCTION || DEV_SEND_EMAILS) {
        await client.sendEmailWithTemplate({
          From: FROM_EMAIL,
          To: to,
          TemplateAlias: 'password-reset',
          TemplateModel: {
            product_url: origin,
            product_name: APP_NAME,
            name: to,
            action_url: resetUrl,
            company_name: APP_NAME,
            company_address: '123 Something St. San Francisco, CA 94123',
          },
        })
      } else {
        // Preview email in the browser
        await previewEmail({
          to,
          from: FROM_EMAIL,
          html: `${resetUrl}`,
          text: `${resetUrl}`,
        })
      }
    },
  }
}
