// Function to check if a string has a valid bracket sequence using a stack Data Structure
function isValidBracketSequence(s) {
  let stack = [];
  let top = -1; // Stack is empty when top is -1

  // Object Mapping for Brackets
  let bracketMap = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  let startBrackets = ["(", "[", "{"];

  function isStartBracket(char) {
    // Check if char is a start bracket
    for (let i = 0; i < startBrackets.length; i++) {
      if (startBrackets[i] === char) {
        return true;
      }
    }
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    let char = s[i];

    if (isStartBracket(char)) {
      // Push onto stack
      top++;
      stack[top] = char;
    } else if (bracketMap[char]) {
      // Check for matching end bracket
      if (top === -1) {
        // No matching start bracket
        return false;
      } else {
        let lastOpen = stack[top];
        top--;
        if (lastOpen !== bracketMap[char]) {
          // Mismatched brackets
          return false;
        }
      }
    }
  }

  return top === -1; // Return true if all brackets are matched
}

// Test cases
console.log(isValidBracketSequence("(){}"));
