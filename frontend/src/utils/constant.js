export const getNameTwoWords = (name = "") => {
    return name
      .split(" ") // Split the name into an array of words
      .slice(0, 2) // Get the first two words
      .map(word => word[0]) // Get the first letter of each word
      .join(" ") // Join them with a space
      .toUpperCase(); // Convert to uppercase
  }

// validationUtils.js

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateName = (name) => {
  const regex = /^[A-Za-z\s]{2,30}$/;
  return regex.test(name);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
};
