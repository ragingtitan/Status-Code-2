import express from 'express';
import userModel from '../Models/userAuthModels.js';
import path from 'path';
import url from 'url';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import { checkLocked, checkDeactivated, checkBanned, lockUser, deactivateUser } from '../Utils/handleUser.js'
import { findProfilePicture } from '../Utils/util.js';
import { mail } from '../Utils/sendMail.js'
import { generateOTPWithExpiry } from '../Utils/generateOTP.js'
import { sendOTP } from '../Utils/sendMessage.js';
import geoip from 'geoip-lite';
import logger from '../Utils/logger.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const signupUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validate input fields
      if (!username || !email || !password) {
        return res.json({ status: false, message: "Please provide all required fields." });
      }

  
      // Check for existing user
      const alreadyExists = await userModel.findOne({
        $or: [
          { email: email },
          { username: username }
        ]
      });
  
      if (alreadyExists) {
        return res.json({ status: false, message: "User already exists with same username or email!" });
      }
  
      // Prevent admin password usage
      if (password === process.env.ADMIN_PASSWORD) {
        return res.json({ status: false, message: "Admin password is not allowed." });
      }
  
      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new userModel({
        username,
        email,
        password: hashPassword,
        verifyEmail: {
          isEmailVerified: false,
          verifiedAt: null
        },
        profile: {
          profilePicture: false,
          bio: "",
          phoneNumber: null,
          verifyPhoneNumber: {
            isPhoneNumberVerified: false,
            verifiedAt: null
          },
          isAdmin: false
        },
        settings: {
          darkTheme: false,
          autoSave: true,
          lang: "en",
          emailUpdate: true,
          twoFactorAuth: false
        },
        security: {
          OTP: {
            OTPCode: null,
            expiryDate: null
          },
          createdAt: new Date(),
          lastLogin: null,
          updatedAt: null,
          failedAttempts: 0
        },
        accountStatus: {
          locked: false,
          lockUntil: null,
          lockReason: "",
          lockedCount: 0
        },
        inactive: {
          isInactive: false,
          inactiveReason: ""
        },
        banned: {
          banType: "none",
          banReason: ""
        }
      });
  
      // Save the user
      await newUser.save();
      return res.json({ status: true, message: "Your registration was successful!" });
  
    } catch (err) {
      console.error("Signup error:", err.message);
      return res.json({ status: false, message: err.message });
    }
  };  
  const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.json({ status: false, message: "Please provide both email and password." });
        }

        // Get user agent details safely
        const ua = req.useragent;

        // Get client IP address (supports reverse proxy)
        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
        const isLocal = ['127.0.0.1', '::1'].includes(ip);
        const geo = !isLocal ? geoip.lookup(ip) : null;

        // Check if user exists
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.json({ status: false, message: "User not found! Please sign up first!" });
        }

        // Check if account is locked, deactivated, or banned
        const locked = await checkLocked(userExists._id);
        const deactivated = await checkDeactivated(userExists._id);
        const banned = await checkBanned(userExists._id);
        console.log(locked)
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            await lockUser(userExists._id); // Lock the user if password is wrong
            let lockedCount = userExists.security.failedAttempts;

            // If failed attempts reach the limit, lock the account
        
            if (lockedCount >= Number(process.env.LOCKED_COUNT)) {
                return res.json({ status: false, message: `Your account has been locked until ${locked[1]}` });
            }
            return res.json({ status: false, message: `Wrong email or password! ${3 - lockedCount} tries remaining!` });
        }

        // If the account is locked, deactivated, or banned
        if (locked[0] || deactivated || banned[0]) {
            return res.json({
                status: false,
                message: locked[0] ? `Your account is locked until ${locked[1]}` :
                          deactivated ? "Your account is deactivated!" :
                          "Your account is banned!"
            });
        }

        // Update last login time and failed attempts in the database
        await userModel.findByIdAndUpdate(userExists._id, {
            $set: {
                'security.lastLogin': new Date(),
                'security.failedAttempts': 0,
                'security.lastLoginIp': ip, // Store the login IP in the database
                'security.lastLoginLocation': geo?.city ? `${geo.city}, ${geo.country}` : 'Unknown', // Store location
            }
        });

        // Structured login log
        logger.info(`${userExists.username} logged in`, {
            event: 'login',
            user: userExists.username,
            time: new Date().toISOString(),
            ip,
            location: geo?.city ? `${geo.city}, ${geo.country}` : 'Unknown',
            device: {
                os: ua?.os || 'Unknown',
                browser: ua?.browser || 'Unknown',
                platform: ua?.platform || 'Unknown'
            },
            userAgentRaw: req.headers['user-agent']
        });

        // Generate JWT token
        const token = jwt.sign({ id: userExists._id, email: userExists.email }, process.env.JWT_KEY, { expiresIn: '1d' });

        // Set cookie with token
        res.cookie(`${process.env.TOKEN_NAME}`, token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Example: 1 day
        return res.json({ status: true, message: "You logged in successfully!", profile:userExists.profile });
    } catch (err) {
        // Error logging
        logger.error('Error during login process', {
            error: err.message,
            stack: err.stack
        });
        return res.json({ status: false, message: err.message });
    }
};

 const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.json({ status: false, message: "User does not exist!" });
        }

        // Generate token for password reset
        const newToken = jwt.sign({ id: userExists._id, email: userExists.email }, process.env.JWT_KEY, { expiresIn: '5m' });

        // Email configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            },
        });

        // Send password reset link
        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Reset Password",
            text: `http://localhost:5173/reset/${newToken}`,
        });

        console.log("Message sent: %s", info.messageId);
        return res.json({ status: true, message: "Password reset link sent to your email." });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
}


const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;
        console.log(token);
        // Verify JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        if (!decodedToken) {
            return res.json({ status: false, message: "Invalid or expired token!" });
        }
        console.log(decodedToken);
        // Hash new password
        const hashPassword = await bcrypt.hash(password, 10);

        // Update user's password
        try {
            await userModel.findByIdAndUpdate(decodedToken.id, {
                $set: {
                    password: hashPassword,
                    security: {
                        updatedAt: new Date(),
                        failedAttempts: 0
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
            return res.json({ status: false, message: "Failed to update password!" });
        }
        console.log("Updated user's password!")
        return res.json({ status: true, message: "Password updated successfully!" });
    } catch (err) {
        return res.json({ status: false, message: err.message });
    }
}

const verifyUser = async (req, res) => {
    try {
        console.log("get verify");

        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.json({ status: false, message: "User does not exist!" });
        }
        return res.json({
            status: true, message: "User authorized!",
            details: { username: user.username, email: user.email, bio: user.profile.bio, phoneNumber: user.profile.phoneNumber, countryCode: user.profile.countryCode},
            settings: { theme: user.settings.theme, autoSave: user.settings.autoSave, lang: user.settings.lang, emailUpdate: user.settings.emailUpdate, twoFactorAuth: user.settings.twoFactorAuth },
            profile: {
                profilePicture: user.profile.profilePicture,
                preferences:user.profile.preferences
            },
            security:{
                loginCount:user.security.loginCount
            },
            accountStatus: {
                locked: {
                    isLocked: user.accountStatus.locked.isLocked,
                    lockUntil: user.accountStatus.locked.lockUntil,
                    lockReason: user.accountStatus.locked.lockReason
                },
                inactive: user.accountStatus.inactive,
                banned: {
                    banType: user.accountStatus.banned.banType,
                    banReason: user.accountStatus.banned.banReason
                }
            },
            isAdmin: user.profile.isAdmin,
            verifyEmail: {
                isEmailVerified: user.verifyEmail.isEmailVerified,
                verifiedAt: user.verifyEmail.verifiedAt
            },
            verifyPhoneNumber: {
                isPhoneNumberVerified: user.profile.verifyPhoneNumber.isPhoneNumberVerified,
                verifiedAt: user.profile.verifyPhoneNumber.verifiedAt
            }
        });
    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, message: err.message });
    }
}


const updateProfile = async (req, res) => {
    try {
        console.log('Updating profile');
        const { username, bio, phoneNumber, countryCode } = req.body;
        console.log(bio, phoneNumber);

        // Find and update the user profile
        const user = await userModel.findByIdAndUpdate(req.userId, {
            $set: {
                'username': username,
                'profile.bio': bio,
                'profile.phoneNumber': phoneNumber,
                'security.updatedAt': new Date(),
                'profile.countryCode': countryCode
            }
        });
        console.log("User updated!")
        if (!user) {
            return res.json({ status: false, message: 'User not found!' });
        }

        return res.json({
            status: true,
            message: 'Profile Updated Successfully!',
            details: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                phoneNumber: user.phoneNumber,
            }
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: false, message: err.message });
    }
}


const updateSettings = async (req, res) => {
    try {
        console.log('Updating settings');
        const { username, theme, autoSave, lang, emailUpdate, twoFactorAuth } = req.body;
        console.log(username, theme, autoSave, lang, emailUpdate, twoFactorAuth);
        // Find and update the user settings
        const user = await userModel.findByIdAndUpdate(
            req.userId,
            {
                $set: {
                    'settings.theme': theme,
                    'settings.autoSave': autoSave,
                    'settings.lang': lang,
                    'settings.emailUpdate': emailUpdate,
                    'settings.twoFactorAuth': twoFactorAuth,
                    'security.updatedAt': new Date()
                }
            }
        );
        console.log("Settings updated!")
        if (!user) {
            return res.json({ status: false, message: 'User not found!' });
        }
        return res.json({
            status: true, message: 'Settings updated!', settings: {
                theme: user.settings.theme,
                autoSave: user.settings.autoSave,
                lang: user.settings.lang,
                emailUpdate: user.settings.emailUpdate,
                twoFactorAuth: user.settings.twoFactorAuth
            }
        });

    } catch (err) {
        console.error(err);
        return res.json({ status: false, message: err.message });
    }
}

const updatePreferences = async (req, res)=>{
    const userId = req.userId;
    console.log(userId)
    const { userType, formData } = req.body;
    console.log(formData);
    await userModel.findByIdAndUpdate(userId, {
        $set: {
            'profile.preferences.preferenceFilled': true,
            'profile.preferences.userType':userType,
            'profile.preferences.jobSeeker.jobRoles': formData.jobRoles || "",
            'profile.preferences.jobSeeker.experience': formData.experience || "",
            'profile.preferences.jobSeeker.jobType': formData.jobType || "",
            'profile.preferences.jobSeeker.salaryRange': formData.salaryRange || "",
            'profile.preferences.jobSeeker.skills': formData.skills || "",
            'profile.preferences.jobSeeker.resume': formData.resume || null,
            'profile.preferences.jobSeeker.location': formData.location || "",
            'profile.preferences.employer.companyName': formData.companyName || "",
            'profile.preferences.employer.industry': formData.industry || "",
            'profile.preferences.employer.hiringNeeds': formData.hiringNeeds || "",
            'profile.preferences.employer.openPositions': formData.openPositions || "",
            'profile.preferences.employer.requiredSkills': formData.requiredSkills || "",
            'profile.preferences.employer.jobDescription': formData.jobDescription || "",
            'profile.preferences.employer.employerSalaryRange': formData.employerSalaryRange || "",
            'security.updatedAt': new Date()
        }
    });
    req.userType = userType;

    return res.json({ status: true, message: "Preferences updated successfully!" });
    
}


const deleteProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.json({ status: false, message: 'User does not exist!' });
        }
        await userModel.findByIdAndDelete(req.userId);
        res.clearCookie('isLoggedIn');
        return res.json({ status: true, message: 'User deleted!' });

    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Internal server error' });
    }
}


const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ status: false, message: 'No file uploaded!' });
        }
        // Your logic to update user profile with the new filename
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.json({ status: false, message: 'User not found!' });
        }
        await userModel.findByIdAndUpdate(req.userId, {
            $set: {
                'profile.profilePicture': true,
                'security.updatedAt': new Date(),
            }
        })
        await user.save();

        return res.json({
            status: true,
            message: 'Profile picture uploaded successfully!',
        });
    } catch (err) {
        console.error(err);
        return res.json({ status: false, message: err.message });
    }
}

const getProfilePicture = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.json({ status: false, message: 'User does not exist!' });
        }

        const url = findProfilePicture(req.userId);
        if (!url) {
            res.json({ status: false, message: 'No profile picture uploaded yet' });
        }
        else {
            const profilepic = path.join(__dirname, '../uploadedFiles', `${url}`)
            console.log("file sent!")
            res.sendFile(profilepic)
        }
    }
    catch (error) {
        console.error(error);
        return res.json({ status: false, message: error.message });
    }
}

const deleteProfilePicture = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.json({ status: false, message: 'User does not exist!' });
        }
        await userModel.findByIdAndUpdate(req.userId, {
            $set: {
                'profile.profilePicture': false,
                'security.updatedAt': new Date(),
            }
        });
        const filePath = `./uploadedFiles/profilepicture_${req.userId}`
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
                return;
            }
            console.log('File deleted successfully!');
        });
        await user.save();
        return res.json({ status: true, message: 'Profile picture deleted successfully!' });
    }
    catch (error) {
        console.error(error);
        return res.json({ status: false, message: error.message });
    }
}

const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log(name, email, message)
        if (email.length == 0 || name.length == 0 || message.length == 0) {
            return res.json({ status: false, message: "Please provide all required fields!" });
        }
        const isMailSent = mail(email, "Feedback", message);
        if (!isMailSent)
            return res.json({ status: false, message: "Failed to send email!" });
        return res.json({ status: true, message: "Feedback Sent!" });
    }
    catch (error) {
        console.error(error);
        return res.json({ status: false, message: error.message });
    }
}

const generateOTPandSendMail = async (req, res) => {
    try {
        console.log("sending email");
        const { email } = req.body;
        console.log("mail is" + email);
        if (!email) {
            throw new Error("Please enter a valid email!");
        }
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            throw new Error("No user found!");
        }
        const { otp, expiresAt } = generateOTPWithExpiry();
        await userModel.findByIdAndUpdate(userExists._id, {
            $set: {
                'security.EmailOTP.OTPCode': otp,
                'security.EmailOTP.expiryDate': expiresAt,
                'security.updatedAt': new Date(),
            }
        })
        const username = userExists.username;
        const html = await ejs.renderFile('./templates/email.ejs' ,{ username, otp});
        console.log(html);
        console.log("mailing!")
        const isMailSent = mail(email, "Verification OTP - jobforce", html);
        if (!isMailSent) {
            return res.json({ message: "Failed to send Mail!", status: false });
        }
        return res.json({ message: `A mail with the TOTP has been sent to ${email}!`, status: true });
    }
    catch (err) {
        console.error(err);
        return res.json({ status: false, message: "Error while generating OTP!" });
    }
}

const generateOTPandSendMessage = async (req, res) => {
    try {
        const { email, phoneNumber, countryCode } = req.body;
        console.log("Send message " + email, phoneNumber)
        if (!email || !phoneNumber) {
            return res.json({ status: false, message: "Please provide all required fields!" });
        }

        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.json({ status: false, message: "User does not exists!" });
        }
        const { otp, expiresAt } = generateOTPWithExpiry();
        await userModel.findByIdAndUpdate(userExists._id, {
            $set: {
                'security.MessageOTP.OTPCode': otp,
                'security.MessageOTP.expiryDate': expiresAt,
                'security.updatedAt': new Date(),
            }
        });
        const isMessageSent = sendOTP(phoneNumber,countryCode,otp);
        console.log(isMessageSent)
        if (!isMessageSent) {
            return res.json({ status: false, message: "Message Not sent!" });
        }
        return res.json({ status: true, message: `A message with the TOTP has been sent to the phone number +${countryCode} ${phoneNumber}!` });
    }
    catch (err) {
        console.error(err);
        return res.json({ status: false, message: "Error while sending OTP!" });
    }
}

const checkOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(email, otp);
        if (!email || !otp) {
            return res.json({ status: false, message: "Please provide an OTP and email to verify!" });
        }
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.json({ status: false, message: "No user found with this email!" });
        }
        const { OTPCode, expiryDate } = userExists.security.EmailOTP;
        console.log(OTPCode, otp);
        if (OTPCode != otp) {
            return res.json({ status: false, message: "Invalid OTP! Please try again." });
        }
        else if (new Date() > expiryDate) {
            return res.json({ status: false, message: "OTP has expired! Please generate a new one." });
        }
        
        await userModel.findByIdAndUpdate(userExists._id, {
            $set: {
                'verifyEmail.isEmailVerified': true,
                'verifyEmail.verifiedAt': new Date(),
                'security.updatedAt': new Date()
            }
        })
        console.log("OTP Verified!")
        return res.json({ message: "Your email has been TOTP verified!", status: true });
    }
    catch (err) {
        console.error(err);
        return res.json({ status: false, message: "Error while verifying email!" });
    }

}

const checkMessageOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.json({ status: false, message: "Please provide an OTP and email to verify!" });
        }
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.json({ status: false, message: "No user found with this email!" });
        }
        const { OTPCode, expiryDate } = userExists.security.MessageOTP;
        if (OTPCode != otp) {
            return res.json({ status: false, message: "Invalid OTP! Please try again." });
        }
        else if (new Date() > expiryDate) {
            return res.json({ status: false, message: "OTP has expired! Please generate a new one." });
        }
        
        await userModel.findByIdAndUpdate(userExists._id, {
            $set: {
                'profile.verifyPhoneNumber.isPhoneNumberVerified': true,
                'profile.verifyPhoneNumber.verifiedAt': new Date(),
                'security.updatedAt': new Date(),
            }
        })
        console.log("OTP Verified!")
        return res.json({ message: "Your Phone Number has been TOTP verified!", status: true });
    }
    catch (err) {
        console.error(err);
        return res.json({ status: false, message: "Error while verifying phone Number!" });
    }
}
const logoutUser = async (req, res) => {
    try {
      const ua = req.useragent;
      const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
      const isLocal = ['127.0.0.1', '::1'].includes(ip);
      const geo = !isLocal ? geoip.lookup(ip) : null;
  
      const username = req.user?.username || 'Guest';
  
      logger.info(`${username} logged out`, {
        event: 'logout',
        user: username,
        time: new Date().toISOString(),
        ip,
        location: geo?.city ? `${geo.city}, ${geo.country}` : 'Unknown',
        device: {
          os: ua?.os || 'Unknown',
          browser: ua?.browser || 'Unknown',
          platform: ua?.platform || 'Unknown'
        },
        userAgentRaw: req.headers['user-agent']
      });
  
      // Clear auth cookie/token and respond
      res.clearCookie(process.env.TOKEN_NAME);
      res.json({ message: 'Logout successful', status:true });
  
    } catch (error) {
      logger.error('Error during logout process', {
        error: error.message,
        stack: error.stack
      });
      res.json({ message: error.message , status:false});
    }
};



export { signupUser, loginUser, forgotPassword, resetPassword, verifyUser, updateProfile, updateSettings, uploadProfilePicture, getProfilePicture, deleteProfilePicture, logoutUser, deleteProfile, contact, generateOTPandSendMail, generateOTPandSendMessage, checkOTP, checkMessageOTP,updatePreferences

}
