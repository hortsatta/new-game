import type { AuditTrail } from './base.type';
import type { Game } from './game.type';

export type GameProduct = AuditTrail & {
  id: number;
  games: Game[];
  discount: number;
  price: number;
  finalPrice: number;
};
