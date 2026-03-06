// Email templates for different purposes

export function getSignupEmailTemplate(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://biotapapp.com';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Signup Request - Sinergia Negotium</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 48, 252, 0.15); overflow: hidden;">
          <!-- Logo Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%);">
              <img src="${baseUrl}/images/securepat-icon.png" alt="Sinergia Negotium Logo" style="width: 60px; height: 60px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Signup Request</h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">Sinergia Negotium Landing Page</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6; font-weight: 400;">
                Hello Admin,
              </p>
              
              <p style="margin: 0 0 24px; color: #333333; font-size: 16px; line-height: 1.6;">
                You have received a new signup request from the <strong style="color: #3b30fc;">Sinergia Negotium</strong> landing page.
              </p>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #3b30fc; padding: 24px; margin: 32px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(59, 48, 252, 0.1);">
                <p style="margin: 0 0 12px; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  📧 Email Address
                </p>
                <p style="margin: 0; color: #3b30fc; font-size: 20px; font-weight: 700; word-break: break-all;">
                  ${email}
                </p>
              </div>
              
              <div style="background-color: #e0f2fe; border-left: 4px solid #0ea5e9; padding: 16px 20px; margin: 24px 0; border-radius: 8px;">
                <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.6;">
                  <strong>ℹ️ Note:</strong> This user has submitted their email address through the hero section signup form on the landing page. Please follow up with them to complete their registration.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 13px; font-weight: 600;">
                Sinergia Negotium
              </p>
              <p style="margin: 0 0 12px; color: #999999; font-size: 12px; line-height: 1.5;">
                Protection. Access. Trust.
              </p>
              <p style="margin: 16px 0 0; color: #999999; font-size: 11px; line-height: 1.5;">
                This is an automated email from <strong style="color: #3b30fc;">Sinergia Negotium Landing Page</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getNewsletterEmailTemplate(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://biotapapp.com';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription - Sinergia Negotium</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 48, 252, 0.15); overflow: hidden;">
          <!-- Logo Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%);">
              <img src="${baseUrl}/images/securepat-icon.png" alt="Sinergia Negotium Logo" style="width: 60px; height: 60px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Newsletter Subscription</h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">Sinergia Negotium Landing Page</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6; font-weight: 400;">
                Hello Admin,
              </p>
              
              <p style="margin: 0 0 24px; color: #333333; font-size: 16px; line-height: 1.6;">
                A new user has subscribed to the <strong style="color: #3b30fc;">Sinergia Negotium</strong> newsletter.
              </p>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #3b30fc; padding: 24px; margin: 32px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(59, 48, 252, 0.1);">
                <p style="margin: 0 0 12px; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  📧 Subscriber Email
                </p>
                <p style="margin: 0; color: #3b30fc; font-size: 20px; font-weight: 700; word-break: break-all;">
                  ${email}
                </p>
              </div>
              
              <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 16px 20px; margin: 24px 0; border-radius: 8px;">
                <p style="margin: 0; color: #065f46; font-size: 14px; line-height: 1.6;">
                  <strong>✅ Action Required:</strong> This user has subscribed through the newsletter form on the landing page. They should be added to your newsletter mailing list.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 13px; font-weight: 600;">
                Sinergia Negotium
              </p>
              <p style="margin: 0 0 12px; color: #999999; font-size: 12px; line-height: 1.5;">
                Protection. Access. Trust.
              </p>
              <p style="margin: 16px 0 0; color: #999999; font-size: 11px; line-height: 1.5;">
                This is an automated email from <strong style="color: #3b30fc;">Sinergia Negotium Landing Page</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export interface ContactFormData {
  orgName: string;
  industrySector: string;
  orgType: string;
  country: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  contactMethod: string;
  procurementCategory: string;
  description: string;
  supportType: string;
}

export function getContactEmailTemplate(data: ContactFormData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://biotapapp.com';
  const formatLabel = (val: string) => val ? val.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '—';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New BioTap Contact Form Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" style="max-width: 760px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 0; box-shadow: 0 14px 40px rgba(0, 0, 0, 0.08); overflow: hidden;">
          <tr>
            <td style="background-color: #0a0a0a; color: #ffffff; padding: 40px 36px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top;">
                    <img src="${baseUrl}/images/logo-white.png" alt="BioTap Logo" style="width: 42px; height: 42px; display: block; margin-bottom: 18px;" />
                    <div style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.72); margin-bottom: 10px;">
                      Contact us
                    </div>
                    <h1 style="margin: 0 0 12px; color: #ffffff; font-size: 34px; font-weight: 700; line-height: 1.1; letter-spacing: -0.03em;">
                      Talk to us
                    </h1>
                    <p style="margin: 0 0 14px; color: rgba(255,255,255,0.95); font-size: 20px; font-weight: 500; line-height: 1.4;">
                      Let’s Build the Future of Biometric Payments Together
                    </p>
                    <p style="margin: 0; color: rgba(255,255,255,0.82); font-size: 14px; line-height: 1.7; max-width: 38ch;">
                      A new message has been submitted through the BioTap contact form. The sender details and message are included below.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px; background-color: #ffffff;">
              <table role="presentation" style="width: 100%; border-collapse: separate; border-spacing: 0; background: #fafafa; border: 1px solid #e5e7eb;">
                <tr>
                  <td colspan="2" style="padding: 18px 20px; border-bottom: 1px solid #e5e7eb; background: #ffffff;">
                    <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; margin-bottom: 6px;">
                      Contact request details
                    </div>
                    <div style="font-size: 22px; font-weight: 700; line-height: 1.2; color: #0a0a0a;">
                      ${data.fullName || 'New message'}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 34%; padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Email</td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;"><a href="mailto:${data.email}" style="color: #111827; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Company</td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">${data.orgName || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Job title</td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">${data.jobTitle || '—'}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Industry</td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">${formatLabel(data.industrySector)}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; color: #6b7280; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Preferred contact</td>
                  <td style="padding: 14px 20px; color: #111827; font-size: 14px;">${formatLabel(data.contactMethod)}</td>
                </tr>
              </table>
              ${data.description ? `
              <div style="margin-top: 22px; padding: 22px 24px; background: #0a0a0a;">
                <p style="margin: 0 0 10px; color: rgba(255,255,255,0.72); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
                <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.75; white-space: pre-wrap;">${data.description}</p>
              </div>
              ` : ''}
              <div style="margin-top: 22px; padding: 18px 20px; border: 1px solid #e5e7eb; background: #ffffff;">
                <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.7;">
                  <strong style="color: #0a0a0a;">Next step:</strong> Reply directly to this email or use
                  <a href="mailto:${data.email}" style="color: #0a0a0a; font-weight: 700; text-decoration: underline;"> ${data.email}</a>
                  to continue the conversation.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 36px; text-align: center; background: #0a0a0a;">
              <img src="${baseUrl}/images/logo-white.png" alt="BioTap" style="width: 28px; height: 28px; display: block; margin: 0 auto 10px;" />
              <p style="margin: 0 0 6px; color: #ffffff; font-size: 14px; font-weight: 700;">BioTap</p>
              <p style="margin: 0; color: rgba(255,255,255,0.72); font-size: 12px; line-height: 1.6;">
                Automated email from the BioTap contact form
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getOTPEmailTemplate(email: string, otpCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://sinergianegotium.com';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code - Sinergia Negotium</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 48, 252, 0.15); overflow: hidden;">
          <!-- Logo Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%);">
              <img src="${baseUrl}/images/securepat-icon.png" alt="Sinergia Negotium Logo" style="width: 60px; height: 60px; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Your Verification Code</h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">Sinergia Negotium Account Verification</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6; font-weight: 400;">
                Hello,
              </p>
              
              <p style="margin: 0 0 32px; color: #333333; font-size: 16px; line-height: 1.6;">
                You have requested a verification code for your <strong style="color: #3b30fc;">Sinergia Negotium</strong> account. Use the code below to complete your verification:
              </p>
              
              <!-- OTP Code Box -->
              <table role="presentation" style="width: 100%; margin: 32px 0;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #3b30fc 0%, #8b5cf6 100%); padding: 36px 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(59, 48, 252, 0.3);">
                    <p style="margin: 0 0 12px; color: rgba(255, 255, 255, 0.9); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">
                      Your Verification Code
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 52px; font-weight: 700; letter-spacing: 12px; font-family: 'Courier New', 'Monaco', monospace; line-height: 1.2;">
                      ${otpCode}
                    </p>
                  </td>
                </tr>
              </table>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; margin: 32px 0; border-radius: 8px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>⏰ Important:</strong> This code will expire in <strong>10 minutes</strong>. Do not share this code with anyone.
                </p>
              </div>
              
              <p style="margin: 24px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                If you didn't request this code, please ignore this email or contact our support team if you have concerns.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 13px; font-weight: 600;">
                Sinergia Negotium
              </p>
              <p style="margin: 0 0 12px; color: #999999; font-size: 12px; line-height: 1.5;">
                Protection. Access. Trust.
              </p>
              <p style="margin: 16px 0 0; color: #999999; font-size: 11px; line-height: 1.5;">
                This email was sent from <strong style="color: #3b30fc;">no-reply@sinergianegotium.com</strong><br/>
                If you have any questions, please contact our support team.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

