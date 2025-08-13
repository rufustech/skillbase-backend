// utils/passwordCheck.js
const bcrypt = require('bcryptjs');

async function verifyPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return {
      isMatch,
      plainLength: plainPassword.length,
      hashedLength: hashedPassword.length,
      isHashedProperly: hashedPassword.startsWith('$2a$'),
      hashStart: hashedPassword.substring(0, 20)
    };
  } catch (error) {
    return {
      error: error.message,
      isMatch: false
    };
  }
}

module.exports = { verifyPassword };
