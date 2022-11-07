import { useReducer } from 'react';
import NextLink from 'next/link';
import { Button, CSS, Link, Row, styled, Text } from '@nextui-org/react';
import { Minus, Plus, X } from 'phosphor-react';

import type { CartItem as CartItemType } from '@/types/cart.type';

type Props = {
  item: CartItemType;
  css: CSS;
  onAddQuantity?: (value: number) => void;
  onRemoveItem?: () => void;
};

const XIcon = styled(X, {
  mx: '$12',
});

const buttonCss = {
  w: '30px',
  h: '30px',
  minWidth: 'auto',
  br: '8px',
};

const CartItem = ({
  item: { gameProduct, quantity },
  onAddQuantity,
  onRemoveItem,
  css,
}: Props) => {
  const dev = gameProduct.games[0].developers[0]?.name || '';
  const pub = gameProduct.games[0].publishers[0]?.name || '';

  const currentQuantityReducer = (state: number, action: any) => {
    if (!!action.type) {
      const newState = Math.min(
        Math.max(action.type === 'add' ? state + 1 : state - 1, 1),
        99
      );
      onAddQuantity && onAddQuantity(newState);
      return newState;
    }
    return state;
  };

  const [currentQuantity, currentQuantityDispatch] = useReducer(
    currentQuantityReducer,
    quantity
  );

  return (
    <Row
      css={{
        px: '$10',
        py: '$6',
        br: '10px',
        alignItems: 'center',
        w: 'fit-content',
        bg: '$accents0',
        ...css,
      }}
    >
      <Button
        aria-label='remove item'
        css={{
          minWidth: 'auto',
          w: '25px',
          h: '25px',
          mr: '$8',
          br: '99px',
          borderWidth: '1px',
        }}
        icon={<X size={16} />}
        onClick={onRemoveItem}
        auto
        ghost
      />
      <div>
        <NextLink href={`games/${gameProduct.games[0].slug}`} passHref>
          <Link color='text'>
            <Text
              css={{
                mb: '$4',
                d: 'inline-block',
                w: '300px',
                fontSize: '$xl',
                fontWeight: '$semibold',
                lineHeight: 1,
              }}
              span
            >
              {gameProduct.games[0].name}
            </Text>
          </Link>
        </NextLink>
        <Text css={{ fontSize: '$xs', lineHeight: 1 }}>
          {pub}
          <Text css={{ mx: '$4' }} span>
            /
          </Text>
          {dev}
        </Text>
      </div>
      <Text
        css={{
          d: 'inline-block',
          minWidth: '100px',
          textAlign: 'right',
          fontSize: '$xl',
          fontWeight: '$medium',
        }}
        span
      >
        ${gameProduct.finalPrice.toFixed(2)}
      </Text>
      <XIcon />
      <Row css={{ mr: '$20', alignItems: 'center', w: 'fit-content' }}>
        <Button
          aria-label='subtract 1 quantity'
          css={buttonCss}
          color='primary'
          icon={<Minus size={20} />}
          onClick={() => currentQuantityDispatch({ type: 'sub' })}
          auto
          shadow
        />
        <Text
          css={{
            d: 'inline-block',
            minWidth: '40px',
            textAlign: 'center',
            fontSize: '$lg',
          }}
          span
        >
          {currentQuantity}
        </Text>
        <Button
          aria-label='add 1 quantity'
          css={buttonCss}
          color='primary'
          icon={<Plus size={20} />}
          onClick={() => currentQuantityDispatch({ type: 'add' })}
          auto
          shadow
        />
      </Row>
      <Text
        css={{
          d: 'inline-block',
          minWidth: '100px',
          textAlign: 'right',
          fontSize: '$xl',
          fontWeight: '$medium',
        }}
        span
      >
        ${(currentQuantity * gameProduct.finalPrice).toFixed(2)}
      </Text>
    </Row>
  );
};

export default CartItem;
