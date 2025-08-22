import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: './secrets.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

// Send password reset link
 const mail = async (destinationEmail, subject, html) => {
   try{
    const sendMail = await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: destinationEmail,
        subject: subject,
        html:html 
    
    });
    
    console.log("Message sent: %s", sendMail.messageId);
    return true;
   }
   catch(err){
    console.error(err);
    return false;
   }
 }


 export { mail };