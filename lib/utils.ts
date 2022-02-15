function decodeBase64(encoded: string) {
  return window.atob(encoded);
}

const EXPORTS = {
  decodeBase64,
};

export default EXPORTS;
