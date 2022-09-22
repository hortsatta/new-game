import type { Game } from './game.type';

export type GameProduct = {
  id: number;
  games: Game[];
  price: number;
  discount: number;
  createdAt: string;
  isActive: boolean;
};
