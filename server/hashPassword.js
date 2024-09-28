const bcrypt = require('bcryptjs');

async function generateHashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
}

generateHashedPassword('me'); // Replace 'your-admin-password' with the password you want  
