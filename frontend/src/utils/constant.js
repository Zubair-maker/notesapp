export const getNameTwoWords = (name = "") => {
    return name
      .split(" ") // Split the name into an array of words
      .slice(0, 2) // Get the first two words
      .map(word => word[0]) // Get the first letter of each word
      .join(" ") // Join them with a space
      .toUpperCase(); // Convert to uppercase
  }
  