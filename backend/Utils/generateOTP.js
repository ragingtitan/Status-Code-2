import crypto from 'crypto';

const generateOTPWithExpiry = (length = 6) => {
    const otp = crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length)).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // Expires in 5 minutes
    return { otp, expiresAt };
  };
  
export { generateOTPWithExpiry };