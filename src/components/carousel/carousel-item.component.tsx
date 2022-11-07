import { forwardRef } from 'react';
import NextLink from 'next/link';
import { Button, CSS, Image, Link, Row, styled, Text } from '@nextui-org/react';
import { FlyingSaucer, Brain } from 'phosphor-react';

import CarouselGameProductPrice from './/carousel-game-product-price.component';
import type { CarouselItem as CarouselItemType } from '@/types/carousel.type';

type Props = {
  item: CarouselItemType;
  ratio: number;
  maxWidth: any;
  css?: CSS;
  onClick?: () => void;
  onAddToCart?: () => void;
  onAddToFavorites?: () => void;
};

const buttonCss = {
  w: '186px',
  minWidth: 'auto',
  fontWeight: '$semibold',
};

const Outer = styled('div', {
  mx: '45px',
  position: 'relative',
  width: '100%',
  flexShrink: 0,
  borderRadius: '24px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  ov: 'hidden',
  filter: 'saturate(0.6)',
  transition: 'filter 0.2s linear',
  '&::before': {
    content: '',
    d: 'block',
    width: '100%',
  },
});

const Inner = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const ContentWrapper = styled('div', {
  position: 'relative',
  d: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  p: '$12 $14',
  w: '100%',
  h: '100%',
  '&::before': {
    content: '',
    position: 'absolute',
    left: 0,
    bottom: 0,
    w: '100%',
    h: '100%',
    linearGradient:
      '0deg, rgba(0,0,0,0.8) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%',
  },
});

const Content = styled(Row, {
  position: 'relative',
  w: '100%',
});

const Left = styled('div', {
  position: 'relative',
  w: '65%',
});

const Right = styled('div', {
  position: 'relative',
  flex: 1,
  d: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const CarouselItem = forwardRef(
  (
    {
      item,
      ratio,
      maxWidth,
      css,
      onAddToCart,
      onAddToFavorites,
      ...moreProps
    }: Props,
    ref: any
  ) => {
    const { index, content } = item;

    return (
      <Outer
        ref={ref}
        css={{
          maxWidth,
          '&::before': {
            pt: `calc((${ratio}) * 100%)`,
          },
          ...css,
        }}
        {...moreProps}
      >
        <Inner>
          <Image
            src={
              content.type === 'image'
                ? content.image.url
                : content.gameProduct.imageUrl ||
                  content.gameProduct.games[0].bgImage
            }
            alt={
              content.type === 'image'
                ? content.image.name || ''
                : content.gameProduct.games[0].name
            }
            containerCss={{
              w: '100%',
              h: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            objectFit='cover'
          />

          {content.type === 'image' ? (
            <ContentWrapper></ContentWrapper>
          ) : (
            <ContentWrapper>
              <Content align='flex-end'>
                <Left>
                  <NextLink
                    href={`/games/${content.gameProduct.games[0].slug}`}
                    passHref
                  >
                    <Link color='text' underline>
                      <Text
                        css={{ mb: '$3', lineHeight: 1.3 }}
                        weight='bold'
                        size='$4xl'
                        h2
                      >
                        {content.gameProduct.games[0].name}
                      </Text>
                    </Link>
                  </NextLink>

                  <Text
                    css={{
                      d: '-webkit-box',
                      w: '100%',
                      m: 0,
                      lineHeight: 1.5,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                      textOverflow: 'ellipsis',
                      ov: 'hidden',
                      lineClamp: 3,
                      '-webkit-line-clamp': 3,
                      '-webkit-box-orient': 'vertical',
                    }}
                  >
                    {content.excerpt ||
                      content.gameProduct.games[0].description}
                  </Text>
                </Left>
                <Right>
                  <CarouselGameProductPrice
                    css={{ mb: '$3' }}
                    price={content.gameProduct.finalPrice}
                    discount={content.gameProduct.discount}
                  />
                  <div>
                    <Button
                      aria-label='add to cart'
                      css={{ mb: '$5', ...buttonCss }}
                      color='primary'
                      icon={<FlyingSaucer weight='light' size={28} />}
                      iconLeftCss={{ m: 0, transform: 'translateX(-18px)' }}
                      onClick={onAddToCart}
                      auto
                      shadow
                    >
                      Add to Cart
                    </Button>
                    <Button
                      aria-label='add to favorites'
                      css={buttonCss}
                      color='secondary'
                      icon={<Brain size={28} />}
                      onClick={onAddToFavorites}
                      auto
                      shadow
                      ghost
                    >
                      Add to Favorites
                    </Button>
                  </div>
                </Right>
              </Content>
            </ContentWrapper>
          )}
        </Inner>
      </Outer>
    );
  }
) as any;

CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;
