import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv'

dotenv.config({path: './secrets.env'});
console.log(process.env.MAX_LIMIT, process.env.TIMEOUT_MINUTES)
const limiter = rateLimit({
    windowMs: Number(process.env.TIMEOUT_MINUTES) * 60 * 1000,
    max: Number(process.env.MAX_LIMIT),
});

export { limiter };