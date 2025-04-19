export enum EMusicCategory {
  ANIME = 'Anime',
  GAME = 'Game',
  JAPANESE = 'Japanese',
  OTHER = 'Other',
  TOUHOU = 'Touhou'
}

export type TMusic = {
  artist: string;
  category: EMusicCategory;
  favourites: boolean;
  imageURL: string;
  link: string;
  owner: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Additional metadata fields
  album?: string;
  year?: string;
  genre?: string;
  trackNumber?: number;
  duration?: number;
  bitrate?: number;
  sampleRate?: number;
  codec?: string;
};

export type TYouTubeVideo = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: TThumbnailUrls;
  };
};

export type TThumbnailUrls = {
  high: {
    url: string;
  };
  medium: {
    url: string;
  };
  low: {
    url: string;
  };
};

// File System Access API types
export interface FileSystemFileHandle {
  kind: 'file';
  name: string;
  getFile(): Promise<File>;
}

export interface FileSystemDirectoryHandle {
  kind: 'directory';
  name: string;
  values(): AsyncIterable<FileSystemFileHandle | FileSystemDirectoryHandle>;
}

// Extend the Window interface to include showDirectoryPicker
declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}
