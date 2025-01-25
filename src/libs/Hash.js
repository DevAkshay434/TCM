import CryptoJS from 'crypto-js';

const SECRET_KEY =process.env.REACT_APP_SECRET_KEY; // Replace with your actual secret key

export const hashData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const unhashData = (hashedData) => {
  const bytes = CryptoJS.AES.decrypt(hashedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
