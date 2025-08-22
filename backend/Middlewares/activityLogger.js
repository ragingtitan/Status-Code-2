import logger from '../Utils/logger.js';
import geoip from 'geoip-lite';

export const activityLogger = (req, res, next) => {
  const ua = req.useragent || {}; // populated by express-useragent middleware

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    'Unknown';

  const geo = geoip.lookup(ip) || {};

  const username = req.user?.username || 'Guest'; // Adjust based on your auth implementation

  // Log after the response is sent, so statusCode is correct
  res.on('finish', () => {
    const method = req.method;
    const url = req.originalUrl;
    const statusCode = res.statusCode;

    const systemInfo = {
      os: ua.os || 'Unknown',
      browser: ua.browser || 'Unknown',
      version: ua.version || 'Unknown',
      platform: ua.platform || 'Unknown',
      ip,
      location: geo.city ? `${geo.city}, ${geo.country}` : 'Unknown'
    };

    logger.info(`${username} accessed ${method} ${url} [${statusCode}]`, {
      meta: {
        user: username,
        method,
        url,
        statusCode,
        system: systemInfo,
        time: new Date().toISOString()
      }
    });
  });

  next();
};

  
