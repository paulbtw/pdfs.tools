import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

export enum DragActions {
  MOVE = 'MOVE',
  SCALE = 'SCALE',
  NO_MOVEMENT = 'NO_MOVEMENT',
}

export enum Color {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  OLIVE = 'olive',
  GREEN = 'green',
  TEAL = 'teal',
  BLUE = 'blue',
  VIOLOET = 'violet',
  PURPLE = 'purple',
  BROWN = 'brown',
  GREY = 'grey',
  BLACK = 'black',
}

export enum AttachmentTypes {
  IMAGE = 'image',
  DRAWING = 'drawing',
  TEXT = 'text',
}

export enum TextMode {
  INSERT = 'insert',
  COMMAND = 'command',
}

export interface PageInfo {
  width: number;
  height: number;
  rotation: number;
  pageNumber: number;
  id: string;
}

export interface PDFInfo {
  id: string;
  file: File;
  fileName: string;
  uint8Array: Uint8Array;
  title: string;
  pageCount: number;
  pdfDocument: PDFDocumentProxy | null;
  pages: {
    width: number;
    height: number;
    rotation: number;
    pageNumber: number;
  }[];
}

export interface PDFProxyInfo {
  id: string;
  PDFDocumentProxy: PDFDocumentProxy;
}
