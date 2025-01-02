export interface MediaItem {
  type: "image" | "video";
  url: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  media: MediaItem[];
}

export type Memories = Memory[];
