import express from 'express';
import { authenticateUser } from '../Middlewares/middlewares.js';
import { preventRelogin } from '../Middlewares/preventRelogin.js';
import { upload} from '../Utils/util.js'
import { signupUser, loginUser, forgotPassword, resetPassword, verifyUser, updateProfile, updateSettings, uploadProfilePicture, getProfilePicture,deleteProfilePicture, logoutUser, deleteProfile, contact, generateOTPandSendMail, generateOTPandSendMessage, checkOTP, checkMessageOTP,updatePreferences } from '../Controllers/userAuthControllers.js';
import { limiter } from '../Middlewares/rateLimiter.js';

const router = express.Router();

router.post('/signup',preventRelogin,limiter,signupUser);
router.post('/signin',preventRelogin, limiter, loginUser);
router.post('/forgot',limiter, forgotPassword);
router.post('/reset/:token', limiter,resetPassword );
router.get('/verify',authenticateUser, verifyUser);
router.post('/updateProfile',authenticateUser, updateProfile);
router.post('/updateSettings',authenticateUser, updateSettings);
router.post('/updatePreferences', authenticateUser, updatePreferences)
router.get('/deleteProfile',authenticateUser, deleteProfile);
router.post('/uploadProfilePic',authenticateUser, upload.single('uploaded_file'), uploadProfilePicture);
router.get('/profilepic',authenticateUser, getProfilePicture);
router.get('/deleteProfilePicture',authenticateUser, deleteProfilePicture);
router.post('/sendMail', authenticateUser, limiter , generateOTPandSendMail )
router.post('/sendMessage', authenticateUser, limiter , generateOTPandSendMessage );
router.post('/checkOTP', authenticateUser, limiter, checkOTP);
router.post('/checkMessageOTP', authenticateUser, limiter, checkMessageOTP)
router.post('/contact', authenticateUser, limiter, contact);
router.get('/logout',authenticateUser, logoutUser);


export { router as userAuthRouters };