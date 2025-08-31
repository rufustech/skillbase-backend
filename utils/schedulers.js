// utils/schedulers.js
const cron = require('node-cron');
const Certificate = require('../models/certificateModel');

exports.initializeCertificateCleanup = () => {
  try {
    // Run at midnight every day
    cron.schedule('0 0 * * *', async () => {
      console.log('Running certificate cleanup...');
      try {
        const result = await Certificate.deleteMany({
          expiresAt: { $lt: new Date() }
        });
        console.log(`Cleaned up ${result.deletedCount} expired certificates`);
      } catch (error) {
        console.error('Certificate cleanup error:', error);
      }
    });
    
    console.log('Certificate cleanup scheduler initialized');
  } catch (error) {
    console.error('Failed to initialize certificate cleanup:', error);
  }
};
