import NextLink from 'next/link';
import { Image, Link, styled, Text } from '@nextui-org/react';
import type { Genre } from '@/types/genre.type';

type Props = {
  genre: Genre;
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
  },
});

const Inner = styled('div', {
  position: 'relative',
  w: '462px',
  h: '262px',
  bg: 'black',
  br: '16px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  ov: 'hidden',
  zIndex: 1,
});

const GenreCard = ({ genre, ...moreProps }: Props) => (
  <Outer>
    <Inner {...moreProps}>
      <NextLink href={`/genres/${genre.slug}`} passHref>
        <Link color='text' underline>
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/genre-${genre.slug}.png`}
            alt={genre.name}
            objectFit='cover'
            containerCss={{
              position: 'absolute',
              top: 0,
              left: 0,
              w: '100%',
              h: '100%',
            }}
          />
          <Text
            css={{
              position: 'absolute',
              left: '136px',
              bottom: '28px',
              fontSize: '$3xl',
              lineHeight: 1,
            }}
            h3
          >
            {genre.name}
          </Text>
        </Link>
      </NextLink>
    </Inner>
  </Outer>
);

export default GenreCard;
