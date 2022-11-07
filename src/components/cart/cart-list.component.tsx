import { CSS, styled } from '@nextui-org/react';

import CartItem from './cart-item.component';
import type { Cart } from '@/types/cart.type';

type Props = {
  cart: Cart;
  css?: CSS;
  onAddQuantity?: (value: number) => void;
};

const Wrapper = styled('div', {});

const CartList = ({
  cart: { cartItems },
  onAddQuantity,
  ...moreProps
}: Props) => (
  <Wrapper {...moreProps}>
    {cartItems.map((ci) => (
      <CartItem
        key={ci.gameProduct.id}
        css={{ mb: '$8' }}
        item={ci}
        onAddQuantity={onAddQuantity}
      />
    ))}
  </Wrapper>
);

export default CartList;
