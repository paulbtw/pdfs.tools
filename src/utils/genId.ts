import crypto from 'crypto';

export const genId = () => {
  const id = crypto.randomBytes(16).toString('hex');
  return id;
};
