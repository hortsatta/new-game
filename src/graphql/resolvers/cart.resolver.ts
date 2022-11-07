import { GraphQLYogaError } from '@graphql-yoga/node';
import { getGameProducts } from './game-product.resolver';

import type { Cart as CartType } from '@/types/cart.type';
import type { GameProduct } from '@/types/game-product.type';

const getCart = async (
  supabase: any,
  filter?: any
): Promise<CartType | null> => {
  const { userId: userIdFilter, paymentIntent: paymentIntentFilter } =
    filter || {};

  const { data, error } = userIdFilter
    ? await supabase.from('cart').select().eq('user_id', userIdFilter)
    : await supabase
        .from('cart')
        .select()
        .eq('payment_intent', paymentIntentFilter);

  if (error) {
    throw new GraphQLYogaError(`Error: ${error.message}`);
  }

  const cart = {
    id: data[0].id,
    userId: data[0].user_id,
    paymentIntent: data[0].payment_intent,
    cartItems: [],
  };

  if (!data[0].cart_items.length) {
    return cart;
  }

  const gameProducts = await getGameProducts(supabase, {
    ids: data[0].cart_items.map((ci: any) => ci.game_product_id),
  });

  cart.cartItems = data[0].cart_items.map(
    ({ quantity, game_product_id }: any) => ({
      quantity,
      gameProduct: gameProducts.find(
        (gp: GameProduct) => gp.id === game_product_id
      ),
    })
  );

  return cart;
};

export const cart = (
  _parent: any,
  { filter }: any,
  { supabase }: any,
  _info: any
) => getCart(supabase, filter);
