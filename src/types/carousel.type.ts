export enum CarouselType {
  GAME,
  IMAGE,
}

export type Image = {
  url: string;
  name?: string;
};

export type CarouselItem = {
  type: CarouselType;
  content: any | Image;
  index?: number;
};
