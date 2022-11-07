import type { AuditTrail } from './base.type';
import type { GameProduct } from './game-product.type';

type CartItem = {
  gameProduct: GameProduct;
  quantity: number;
};

type Cart = AuditTrail & {
  id: number;
  userId: string;
  cartItems: CartItem[];
  paymentIntent: string;
};

export type { CartItem, Cart };
