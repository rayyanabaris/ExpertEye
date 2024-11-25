module.exports =  function generateRandomString(length) {
//  const alphabeticChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numericChars = '0123456789';
  let randomString = '';

  
  // Generate the rest of the string with numeric characters
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * numericChars.length);
    randomString += numericChars.charAt(randomIndex);
  }

  return randomString;
}


  
  // Example: Generate a random string of length 8
  