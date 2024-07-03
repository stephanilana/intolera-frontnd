export function isBase64(str: string) {
  try {
    // Decode the string
    const decodedString = atob(str);
    // Encode the decoded string back to Base64
    const encodedString = btoa(decodedString);
    // Check if the re-encoded string matches the original input
    return encodedString === str;
  } catch (error) {
    // If an error occurs during decoding, the string is not Base64
    return false;
  }
}
