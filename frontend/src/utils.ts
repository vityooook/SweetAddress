export const generateRandomPrefix = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "UQ";
  for (let i = 0; i < 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateShortTonAddress = (): string => {
  const base58Chars =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const addressLength = 46; // Target address length
  const prefix = "UQ";

  // Generate a random string of the required length minus the prefix
  let randomAddress = "";
  for (let i = 0; i < addressLength - prefix.length; i++) {
    randomAddress += base58Chars.charAt(
      Math.floor(Math.random() * base58Chars.length)
    );
  }

  // Combine prefix with the random address
  return prefix + randomAddress;
};

export const generateRandomSymbol = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return characters.charAt(Math.floor(Math.random() * characters.length));
};
