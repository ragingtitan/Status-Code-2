// Alert email sender — notifies dev team if the server goes down
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  }
});

/**
 * Sends an alert email to the dev team when the server goes down.
 * Accepts optional subject/message, or uses default.
 */
export const sendAlertEmail = async (
  subject = '🚨 Server Down: Immediate Attention Required',
  message = `
⚠️ The server appears to be down.

• Timestamp: ${new Date().toISOString()}
• Environment: ${process.env.NODE_ENV || 'unknown'}
• Affected Service: Web Server / API

Recommended Action:
- Check server health and logs immediately.
- Restart service if necessary.
- Escalate to on-call engineer if unresolved.

-- 
Automated Alert System
`
) => {
  try {
    await transporter.sendMail({
      from: process.env.ALERT_EMAIL_FROM || process.env.USER_EMAIL,
      to: process.env.ALERT_EMAIL_TO,
      subject,
      text: message
    });
    console.log('✅ Alert email sent to dev team.');
  } catch (error) {
    console.error(`❌ Failed to send alert email: ${error.message}`);
  }
};
