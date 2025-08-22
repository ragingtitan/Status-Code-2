import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },

    verifyEmail: {
        isEmailVerified:{
            type: Boolean,
            default: false
        },
        verifiedAt:{
            type: Date,
            default: null
        }
    },

    password: {
        type: String,
        required: true
    },

    profile: {
        profilePicture: {
            type: Boolean,
            default: false
        },

        bio: {
            type: String,
            default: "",
            maxlength: 160,
        },

        countryCode:{
            type:Number,
            default: 91,
        },

        phoneNumber: {
            type: Number,
            default: null,
            match: [/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"]
        },

        verifyPhoneNumber:{
            isPhoneNumberVerified:{
                type: Boolean,
                default: false,
            },
            verifiedAt:{
                type: Date,
                default: null
            }
        },

        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        preferences:{
            type:Preferences,
            required:false
        }

    },

    settings: {
        darkTheme: {
            type: Boolean,
            default: false
        },
        autoSave: {
            type: Boolean,
            default: true
        },
        lang: {
            type: String,
            default: "en",
            enum: ["en", "es", "fr", "de", "ru"]
        },
        emailUpdate: {
            type: Boolean,
            default: true
        },
        twoFactorAuth: {
            type: Boolean,
            default: false
        }
    },
    security: {
        EmailOTP:{
            OTPCode:{
                type: Number,
                default: null
            },
            expiryDate:{
                type: Date,
                default: null
            }
        },
        MessageOTP:{
            OTPCode:{
                type: Number,
                default: null
            },
            expiryDate:{
                type: Date,
                default: null
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        lastLogin: {
            type: Date,
            default: null
        },
        updatedAt: {
            type: Date,
            default: null
        },
        failedAttempts: {
            type: Number,
            default: 0,
            min: 0
        },
        loginCount:{
            type:Number,
            default:0,
            min:0
        }
    },
    accountStatus: {
        locked: {
            isLocked: {
                type: Boolean,
                default: false
            },
            lockUntil: {
                type: Date,
                default: null
            },
            lockReason: {
                type: String,
                default: ""
            },
            lockedCount: {
                type: Number,
                default: 0
            }
        },
        inactive: {
            isInactive:{
                type: Boolean,
                default: false
            },
            inactiveReason:{
                type: String,
                default: ""
            }
            
        },
        banned: {
            banType: {
                type: String,
                default: "none",
                enum: ["permanent", "temporary", "none"]
            },
            banReason: { 
                type: String,
                default: ""
            }
        }
    }
});

const userModel = mongoose.model('auth',userSchema);
export default userModel;