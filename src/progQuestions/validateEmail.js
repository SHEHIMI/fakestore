// Function that takes email as input and validates it
function validateEmail(email) {
    // Trim spaces from the email string to correct it
    email = email.trim();

    // Email should not be empty or no more than 256 characters
    if (email.length === 0 || email.length > 256) {
        return false;
    }

    // Check for exactly one @ char
    let Index = -1;
    let Count = 0;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            Count++;
            Index = i;
        }
    }

    // If count is not 1, no @ exists
    if (Count !== 1) {
        return false;
    }

    // @ should not be the first or last char
    if (Index === 0 || Index === email.length - 1) {
        return false;
    }

    // There should be at least one . after the @
    let dotIndex = -1;
    for (let i = Index + 1; i < email.length; i++) {
        if (email[i] === '.') {
            dotIndex = i;
            break;
        }
    }

    if (dotIndex === -1) {
        return false;
    }

    // . should not be immediately preceded or followed by @
    if (dotIndex === Index + 1 || dotIndex === email.length - 1) {
        return false;
    }

    // check how many characters are there after the last .
      let lastDotIndex = -1;
      for (let i = 0; i < email.length; i++) {
          if (email[i] === '.') {
              lastDotIndex = i;
          }
      }
  
      // If no . was found or less than 3 characters follow the last dot, return false
      if (lastDotIndex === -1 || email.length - lastDotIndex <= 3) {
          return false;
      }

    return true;
}

// Test cases from the problem
console.log(validateEmail("john.doe@gmail.com"));
console.log(validateEmail("john@doe@gmail.com"));
console.log(validateEmail("john@gmail.c"));
console.log(validateEmail("john@.com"));