import { useRef } from 'react';
import { CSS, Row, styled } from '@nextui-org/react';
import SimpleBar from 'simplebar-react';
import { CaretCircleLeft, CaretCircleRight } from 'phosphor-react';

import { BaseTitle } from '@/components/base';
import { GenreList } from '@/components/genre';
import type { Genre } from '@/types/genre.type';

type Props = {
  genres: Genre[];
  css?: CSS;
};

const SCROLL_OFFSET = 462 + 24;

const Section = styled('section');

const Button = styled('button', {
  all: 'unset',
  w: '44px',
  h: '44px',
  color: '$text',
  border: 0,
  opacity: 0.6,
  cursor: 'pointer',
  transition: 'opacity 0.12s ease',
  '&:hover, &:active': { bg: 'transparent', opacity: 1 },
});

const HomeFeaturedGenresList = ({ genres, css }: Props) => {
  const scrollbarRef = useRef<any>(null);

  const scrollList = (event: any, isBack = false) => {
    event.preventDefault();
    if (!scrollbarRef.current) {
      return;
    }
    scrollbarRef.current.scrollBy({
      left: isBack ? -SCROLL_OFFSET : SCROLL_OFFSET,
      behavior: 'smooth',
    });
  };

  return (
    <Section css={css}>
      <Row css={{ w: '100%' }} justify='space-between' align='center'>
        <BaseTitle css={{ mb: 0 }}>Browse Games by Genre</BaseTitle>
        <Row css={{ w: 'fit-content' }}>
          <Button
            aria-label='scroll to left'
            css={{ mr: '$1' }}
            onClick={(event) => scrollList(event, true)}
          >
            <CaretCircleLeft weight='light' size={42} />
          </Button>
          <Button aria-label='scroll to right' onClick={scrollList}>
            <CaretCircleRight weight='light' size={42} />
          </Button>
        </Row>
      </Row>
      <SimpleBar
        scrollableNodeProps={{ ref: scrollbarRef }}
        style={{ width: '100%', overflowY: 'hidden' }}
      >
        <GenreList
          css={{
            flexWrap: 'nowrap',
            py: '20px',
            '> div:not(last-child)': {
              mr: '20px',
            },
          }}
          gap={0}
          genres={genres}
        />
      </SimpleBar>
    </Section>
  );
};

export default HomeFeaturedGenresList;
