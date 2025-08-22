import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import xss from 'xss-clean';
import expressUseragent from 'express-useragent';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './Database/connection.js';
import { userAuthRouters } from './Routes/userAuthRouters.js';
import { userAppRouters } from './Routes/userAppRouters.js';
import { userEmployerJobRouters } from './Routes/userEmployerJobRouters.js';
import { authenticateUser } from './Middlewares/middlewares.js';
import { userJobSeekerRouters } from './Routes/userJobSeekerRouters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path:'secrets.env'});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(expressUseragent.express());

app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// Helmet config
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'", "https://trusted.cdn.com"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com"],
      "img-src": ["'self'", "data:", "https://images.example.com"],
      "connect-src": ["'self'", "https://api.example.com"],
      "frame-src": ["'none'"],
      "frame-ancestors": ["'self'", "http://localhost:5173"],
      "object-src": ["'none'"],
      "upgrade-insecure-requests": []
    }
  },
  referrerPolicy: { policy: 'no-referrer' },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  noSniff: true,
  dnsPrefetchControl: { allow: false },
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Static file security headers
const staticOptions = {
  setHeaders: (res, filePath) => {
    res.setHeader('X-Frame-Options', 'ALLOW-FROM http://localhost:5173');
    res.setHeader("default-src 'self'; frame-ancestors 'self' http://localhost:5173;");
  }
};

// // Serve static files with security headers
app.use(express.static(path.join(__dirname, 'public'), staticOptions));
app.use('/resumes',express.static(path.join(__dirname, "uploadedResumes")));

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));

connectDB(process.env.MONGODB_URI_CLOUD);

app.use('/auth', userAuthRouters);
app.use('/app',authenticateUser, userAppRouters);
app.use('/jobs',authenticateUser, userEmployerJobRouters);
app.use('/apply', authenticateUser, userJobSeekerRouters);

app.listen(process.env.PORT,()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
