import { getDocument } from 'pdfjs-dist';

export const readAsArrayBuffer = (
  file: File,
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const readAsImage = (src: Blob | string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    if (src instanceof Blob) {
      const url = window.URL.createObjectURL(src);
      img.src = url;
    } else {
      img.src = src;
    }
  });
};

export const readAsDataURL = (
  file: File,
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
};

interface PDF {
  numPages: number;
  getPage: (index: number) => Promise<any>;
}
export const readAsPDF = async (
  file: File,
  password: string = '',
): Promise<PDF> => {
  // Safari possibly get webkitblobresource error 1 when using origin file blob
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  return getDocument({ url, password }).promise;
};
