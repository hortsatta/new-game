import type { Game } from './game.type';

export type GameProduct = {
  id: number;
  games: Game[];
  discount: number;
  price: number;
  finalPrice: number;
  isActive?: boolean;
  createdAt?: string;
};
