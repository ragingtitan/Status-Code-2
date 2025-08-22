// encryptor.js

// Simple Base64 wrapper (built-in browser safe)
export const encrypt = (text) => {
  try {
    return btoa(text); // encode string -> base64
  } catch (err) {
    console.error("Encrypt failed:", err);
    return text; // fallback to original
  }
};

export const decrypt = (encoded) => {
  try {
    return atob(encoded); // decode base64 -> string
  } catch (err) {
    console.error("Decrypt failed:", err);
    return encoded; // fallback to original
  }
};
