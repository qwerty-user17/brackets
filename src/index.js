module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = {};
  const closeBrackets = {};

  bracketsConfig.forEach(([open, close]) => {
    openBrackets[open] = close;
    closeBrackets[close] = open;
  });

  const isValid = str.split('').every((char) => {
    const isOpen = Object.prototype.hasOwnProperty.call(openBrackets, char);
    const isClose = Object.prototype.hasOwnProperty.call(closeBrackets, char);

    if (isOpen && isClose && openBrackets[char] === char) {
      if (stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
      return true;
    }

    if (isOpen) {
      stack.push(char);
      return true;
    }

    if (isClose) {
      if (stack.length === 0) return false;
      const last = stack.pop();
      return last === closeBrackets[char];
    }

    return true;
  });

  return isValid && stack.length === 0;
};
