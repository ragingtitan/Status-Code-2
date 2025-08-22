import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config({ path: './secrets.env' });
// Configure your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID from your Twilio dashboard
const authToken = process.env.TWILIO_AUTH_TOKEN; // Twilio Auth Token from your Twilio dashboard
const client = twilio(accountSid, authToken);

const formatPhoneNumber = (phoneNumber, countryCode) => {
    const formattedPhonenumber = `+${countryCode}${phoneNumber}`;
    console.log(formattedPhonenumber);
    return formattedPhonenumber;
}

const sendOTP = (phoneNumber, countryCode, otp) => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber, countryCode);
    
    return client.messages
        .create({
            body: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
            to: formattedPhoneNumber // The recipient's phone number as a string
        })
        .then(message => {
            console.log(`OTP sent successfully. Message SID: ${message.sid}`);
            return true; // Return true on success
        })
        .catch(error => {
            console.error(`Error sending OTP: ${error.message}`);
            return false; // Return false on error
        });
};

export { sendOTP };