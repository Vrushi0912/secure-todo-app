import CryptoJS from 'crypto-js';

let masterKey: string | null = null;

export const setMasterKey = (key: string) => {
  masterKey = key;
};

export const clearMasterKey = () => {
  masterKey = null;
};

export const hasMasterKey = () => masterKey !== null;

export const encryptData = (data: string): string => {
  if (!masterKey) throw new Error("Master key not set");
  return CryptoJS.AES.encrypt(data, masterKey).toString();
};

export const decryptData = (ciphertext: string): string => {
  if (!masterKey) throw new Error("Master key not set");
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, masterKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error("Wrong key");
    return decrypted;
  } catch (e) {
    throw new Error("Decryption failed");
  }
};
