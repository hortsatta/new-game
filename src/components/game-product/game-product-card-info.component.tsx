import {
  Badge,
  Button,
  Image,
  Link,
  Row,
  styled,
  Text,
} from '@nextui-org/react';
import { format } from 'date-fns';
import { Brain, FlyingSaucer } from 'phosphor-react';

import type { GameProduct } from '@/types/game-product.type';

type Props = {
  gameProduct: GameProduct;
  onAddToCart?: () => void;
  onAddToFavorites?: () => void;
};

const Outer = styled('div', {
  position: 'relative',
  mb: '-209px',
  px: '20px',
  paddingBlock: '7px 8px',
  w: '100%',
  h: '275px',
  borderTop: '1px solid rgba(255,0,0,0.2)',
  transition: 'margin 0.3s ease-in-out',
  '&::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    w: '100%',
    h: '100%',
    bg: 'rgba(255,0,0,0.12)',
    backdropFilter: 'blur(10px)',
  },
});

const Inner = styled('div', {
  position: 'relative',
  w: '100%',
  h: '100%',
  zIndex: 1,
});

const Fold = styled('div', {
  w: '100%',
  d: 'none',
});

const InfoRow = styled('div', {
  d: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  minHeight: '35px',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
});

const Price = styled('div', {
  d: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
});

const PatternRow = styled('div', {
  py: '$2',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  '&::after': {
    content: '',
    d: 'block',
    w: '100%',
    h: '24px',
    bg: 'url(/images/bg-pattern.svg) 0 50% repeat-x',
    opacity: 0.5,
  },
});

const metaStarCss = {
  m: 0,
  w: '20px',
  h: '20px',
};

const infoRowTitleCss = {
  color: '#ab5252',
  fontSize: '11px',
  fontWeight: 500,
  textTransform: 'uppercase',
};

const buttonCss = {
  w: '60px',
  h: '40px',
  minWidth: 'auto',
};

const GameProductCardInfo = ({
  gameProduct: { discount, price, finalPrice, games },
  onAddToCart,
  onAddToFavorites,
}: Props) => {
  const metaStars = [...Array(Math.floor(games[0].metaScore)).keys()];
  const metaLastStar =
    (games[0].metaScore % 1) * 10 >= 5
      ? Math.floor((games[0].metaScore % 1) * 10)
      : 0;

  return (
    <Outer className='info'>
      <Inner>
        <Row css={{ pb: '8px' }} justify='space-between'>
          <div>
            <Row css={{ pt: '3px', mb: '$5' }}>
              {games[0].parentPlatforms.map((pp, index) => (
                <Image
                  key={index}
                  containerCss={{ marginInline: '0 $5', h: '16px' }}
                  src={`/images/plat-${pp}.svg`}
                  alt={pp}
                />
              ))}
            </Row>
            <Row>
              {metaStars.map((index) => (
                <Image
                  key={index}
                  containerCss={metaStarCss}
                  objectFit='cover'
                  src='/images/rate-star.png'
                  alt=''
                />
              ))}
              {!!metaLastStar &&
                (metaLastStar > 8 ? (
                  <Image
                    containerCss={metaStarCss}
                    objectFit='cover'
                    src='/images/rate-star.png'
                    alt=''
                  />
                ) : (
                  <Image
                    containerCss={metaStarCss}
                    objectFit='cover'
                    src='/images/rate-star-half.png'
                    alt=''
                  />
                ))}
            </Row>
          </div>
          <Price>
            {!!discount && (
              <Badge
                css={{
                  mb: '7px',
                  pb: '3px',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  border: 0,
                }}
                color='success'
              >
                {discount}% off
              </Badge>
            )}
            <Row {...(!discount && { css: { py: '14px' } })}>
              {!!discount && (
                <Text
                  css={{
                    mr: '$3',
                    textDecoration:
                      'line-through solid rgba(245,165,36,0.8) 2px',
                    opacity: 0.7,
                  }}
                  size='$sm'
                  span
                >
                  ${price}
                </Text>
              )}
              <Text
                css={{
                  textTransform: 'uppercase',
                  fontSize: '26px',
                  lineHeight: 1,
                  opacity: 0.8,
                }}
                weight='semibold'
                span
              >
                {finalPrice > 0 ? (
                  <>
                    <Text
                      css={{
                        d: 'inline-block',
                        mr: '$1',
                        fontSize: '14px',
                        transform: 'translateY(-6px)',
                      }}
                      weight='semibold'
                      small
                    >
                      $
                    </Text>
                    {finalPrice}
                  </>
                ) : (
                  'Free'
                )}
              </Text>
            </Row>
          </Price>
        </Row>
        <Fold className='info-fold'>
          <hr />
          <InfoRow>
            <Text css={infoRowTitleCss} span>
              Genres
            </Text>
            <Text size='$xs' span>
              {games[0].genres.map((g) => g.name).join(', ')}
            </Text>
          </InfoRow>
          <InfoRow>
            <Text css={infoRowTitleCss} span>
              Release Date
            </Text>
            <Text size='$xs' span>
              {format(new Date(games[0].released), 'MMMM dd, yyyy')}
            </Text>
          </InfoRow>
          <InfoRow>
            <Text css={infoRowTitleCss} span>
              Website
            </Text>
            <Link
              href={games[0].website}
              css={{
                maxWidth: '200px',
                d: 'inline-block',
                fontSize: '$xs',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                ov: 'hidden',
              }}
              color='text'
              target='_blank'
            >
              {games[0].website}
            </Link>
          </InfoRow>
          <PatternRow />
          <Row css={{ pt: '12px' }} justify='space-between' align='center'>
            <Row>
              <Button
                aria-label='add to cart'
                css={{ mr: '10px', ...buttonCss }}
                color='primary'
                icon={<FlyingSaucer weight='light' size={28} />}
                onClick={onAddToCart}
                auto
                shadow
              />
              <Button
                aria-label='add to favorites'
                css={buttonCss}
                color='secondary'
                icon={<Brain size={28} />}
                onClick={onAddToFavorites}
                auto
                shadow
                ghost
              />
            </Row>
            {games[0].esrbRating && (
              <Image
                src={`/images/esrb-${games[0].esrbRating.slug}.png`}
                alt={games[0].esrbRating.name}
                width={30}
                height={40}
              />
            )}
          </Row>
        </Fold>
      </Inner>
    </Outer>
  );
};

export default GameProductCardInfo;
