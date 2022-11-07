import NextLink from 'next/link';
import { styled, Image, Link, Text } from '@nextui-org/react';
import { GameProductCardInfo } from './game-product-card-info.component';
import type { GameProduct } from '@/types/game-product.type';

type Props = {
  gameProduct: GameProduct;
};

const Outer = styled('div', {
  position: 'relative',
  w: 'fit-content',
  px: '2px',
  pb: '2px',
  bg: 'transparent',
  '&::before': {
    content: '',
    position: 'absolute',
    left: 0,
    top: 0,
    w: '100%',
    h: '100%',
    linearGradient: '0deg, rgba(252,0,5,1) 0%, rgba(252,0,5,0) 70%',
    br: '16px',
    ov: 'hidden',
    opacity: 0,
    transition: 'opacity 0.12s ease-in-out',
  },
  '&::after': {
    content: '',
    position: 'absolute',
    left: '2px',
    top: 0,
    w: 'calc(100% - 4px)',
    h: '16px',
    borderTop: '4px solid rgba(255,255,255,0.1)',
    btlr: '16px',
    btrr: '16px',
    ov: 'hidden',
    zIndex: 2,
    opacity: 0,
    transition: 'opacity 0.12s ease-in-out',
  },
  '&:hover': {
    '&::before, &::after': { opacity: 1 },
    '.info': { mb: 0 },
    '.info-fold': { d: 'block' },
    '.bg-image img': {
      transform: 'scale(1.1)',
      opacity: '0.6',
      transition: 'opacity 0.3s ease-in-out, transform 4s linear',
    },
    '.game-title': { mb: '0px' },
    '.game-devpub': {
      mb: '6px',
      opacity: 1,
    },
  },
});

const Inner = styled('div', {
  position: 'relative',
  w: '344px',
  h: '550px',
  bg: 'black',
  br: '16px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  ov: 'hidden',
  zIndex: 1,
});

const Article = styled('article', {
  position: 'relative',
  d: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  w: '100%',
  h: '100%',
  zIndex: 1,
});

const TitleWrapper = styled('div', {
  px: '20px',
});

export const GameProductCard = ({ gameProduct, ...moreProps }: Props) => {
  const { games } = gameProduct;
  const dev = games[0].developers[0]?.name || '';
  const pub = games[0].publishers[0]?.name || '';

  return (
    <Outer>
      <Inner {...moreProps}>
        <Image
          className='bg-image'
          src={games[0].bgImage}
          alt={games[0].name.toLowerCase()}
          width={344}
          height={550}
          objectFit='cover'
          css={{
            objectPosition: `${games[0].bgImageOffsetPosX || 50}% 50%`,
            opacity: 1,
            transform: 'scale(1)',
            transition: 'all 0.3s ease-in-out',
          }}
          containerCss={{
            position: 'absolute',
            top: 0,
            left: 0,
            '&::after': {
              content: '',
              position: 'absolute',
              top: 0,
              left: 0,
              w: '100%',
              h: '100%',
              linearGradient: `0deg, rgba(0,0,0,${games[0].backdropOpacity}) 0%, rgba(0,0,0,0) 50%`,
              zIndex: 1,
            },
          }}
        />
        <Article>
          <TitleWrapper>
            <NextLink href={`/games/${games[0].slug}`} passHref>
              <Link color='text' underline>
                <Text
                  className='game-title'
                  css={{
                    mb: '-15px',
                    lineHeight: 1.2,
                    transition: 'margin 0.2s ease-in-out 0.3s',
                  }}
                  h3
                >
                  {games[0].name}
                </Text>
              </Link>
            </NextLink>
            <Text
              className='game-devpub'
              css={{
                mb: 0,
                opacity: 0,
                transition: 'opacity 0.2s ease-in-out 0.24s',
              }}
              size='$xs'
            >
              {dev}
              <Text css={{ mx: '$4' }} span>
                /
              </Text>
              {pub}
            </Text>
          </TitleWrapper>
          <GameProductCardInfo gameProduct={gameProduct} />
        </Article>
      </Inner>
    </Outer>
  );
};
