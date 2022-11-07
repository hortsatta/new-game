import { CSS, Grid } from '@nextui-org/react';
import { GameProductCard } from './game-product-card.component';
import type { GameProduct } from '@/types/game-product.type';

type Props = {
  gameProducts: GameProduct[];
  css?: CSS;
  itemCss?: CSS;
  gap?: number | undefined;
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
};

export const GameProductList = ({
  gameProducts,
  itemCss,
  ...moreProps
}: Props) => (
  <Grid.Container gap={2} {...moreProps}>
    {gameProducts.map((gp: GameProduct) => (
      <Grid key={gp.id} css={itemCss}>
        <GameProductCard gameProduct={gp} />
      </Grid>
    ))}
  </Grid.Container>
);
