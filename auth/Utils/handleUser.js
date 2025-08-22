import userModel from "../Models/userAuthModels.js";
import cron from 'node-cron';

const checkLocked = async (id) => {
    const user = await userModel.findById(id);
    const failedTries = user.security.failedAttempts;
    const lockTime = user.accountStatus.locked.lockUntil;
    if (user.accountStatus.locked.isLocked) {
        return [true, lockTime, user.accountStatus.locked.lockReason, failedTries];
    }
    return [false, null, "", failedTries];
}

const checkDeactivated = async (id) => {
    const user = await userModel.findById(id);
    return user.accountStatus.inactive.isInactive;
}

const checkBanned = async (id) => {
    const user = await userModel.findById(id);
    if (user.accountStatus.banned.banType === "temporary" || user.accountStatus.banned.banType === "permanent") {
        return [true, user.accountStatus.banned.banType];
    }
    return [false, "none"];
}

const lockUser = async (id) => {
    const maxRetries = Number(process.env.MAX_RETRIES) || 2; //N-1 tries
    const user = await userModel.findById(id);
    let currentTries = user.security.failedAttempts;
    const lockedCount = user.accountStatus.locked.lockedCount;
    let lockTime = user.accountStatus.locked.lockUntil;

    currentTries++;
    await userModel.findByIdAndUpdate(id, { $set: { 'security.failedAttempts': currentTries } });
    
    if (currentTries >= maxRetries) {
        await userModel.findByIdAndUpdate(id, {
            $set: {
                'accountStatus.locked.isLocked': true,
                'accountStatus.locked.lockUntil': new Date(Date.now() + 1 * 60 * 1000),
                'accountStatus.locked.lockReason': 'Too many failed login attempts.',
                'security.failedAttempts': currentTries,
                'accountStatus.locked.lockedCount': lockedCount + 1
            }
        });
    }

    if (lockTime && new Date() > new Date(lockTime)) {
        console.log('Unlocking user due to expired lock.');
        await unlockUser(id);
    }
}

// Function to unlock users based on their lock status
const unlockExpiredUsers = async () => {
    const lockedUsers = await userModel.find({ 'accountStatus.locked.isLocked': true });
    for (const user of lockedUsers) {
        if (new Date() > new Date(user.accountStatus.locked.lockUntil)) {
            await unlockUser(user._id);
        }
    }
}

const unlockUser = async (id) => {
    await userModel.findByIdAndUpdate(id, {
        $set: {
            'accountStatus.locked.isLocked': false,
            'accountStatus.locked.lockUntil': null,
            'accountStatus.locked.lockReason': '',
            'security.failedAttempts': 0
        }
    });
    console.log("User unlocked");
}

const deactivateUser = async (id, reason) => {
    if (!reason) throw new Error("Reason not provided!");
    await userModel.findByIdAndUpdate(id, { $set: {
        'accountStatus.inactive.isInactive': true,
        'accountStatus.inactive.inactiveReason': reason
    } });
}

const banUser = async (id) => {
    const user = await userModel.findById(id);
    const lockedCount = user.accountStatus.locked.lockedCount;

    if (lockedCount >= 3) {
        await userModel.findByIdAndUpdate(id, {
            $set: {
                'accountStatus.banned.isBanned': true,
                'accountStatus.banned.banType': 'temporary',
                'accountStatus.banned.banReason': 'Automatically banned for repeated failed logins! Please contact the administrator!'
            }
        });
    }
}

// Schedule the cron job to unlock expired users
cron.schedule('*/30 * * * * *', async () => {
    console.log('Checking for expired locks...');
    await unlockExpiredUsers();
    console.log('Checked for expired locks.');
});

export { checkLocked, checkDeactivated, checkBanned, lockUser, deactivateUser, banUser };
