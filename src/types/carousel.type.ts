import { GameProduct } from './game-product.type';

type CarouseImage = {
  url: string;
  name?: string;
};

type CarouselGameProduct = GameProduct & {
  imageUrl: string;
};

type CarouselImageContent = {
  type: 'image';
  image: CarouseImage;
  excerpt?: string;
};

type CarouselGameProductContent = {
  type: 'game';
  gameProduct: CarouselGameProduct;
  excerpt?: string;
};

type CarouselItem = {
  content: CarouselImageContent | CarouselGameProductContent;
  index?: number;
};

export type {
  CarouseImage,
  CarouselGameProduct,
  CarouselImageContent,
  CarouselGameProductContent,
  CarouselItem,
};
