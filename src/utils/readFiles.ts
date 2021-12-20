import { readAsDataURL } from './asyncReader';

export const readFiles = async (f: File[]) => {
  const loadedPDFs = await Promise.all(
    f.map(async (fileToRead) => {
      const buffer = await readAsDataURL(fileToRead);
      if (!buffer) {
        throw new Error('Could not read file');
      }
      return buffer;
    }),
  );

  return loadedPDFs;
};
