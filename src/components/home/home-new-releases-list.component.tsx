import { useRef } from 'react';
import { CSS, Row, styled } from '@nextui-org/react';
import SimpleBar from 'simplebar-react';
import { CaretCircleLeft, CaretCircleRight } from 'phosphor-react';

import { BaseTitle } from '@/components/base';
import { GameProductList } from '@/components/game-product';
import type { GameProduct } from '@/types/game-product.type';

type Props = {
  gameProducts: GameProduct[];
  css?: CSS;
};

const SCROLL_OFFSET = 344 + 24;

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

const HomeNewReleasesList = ({ gameProducts, css }: Props) => {
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
        <BaseTitle css={{ mb: 0 }}>New Releases</BaseTitle>
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
        <GameProductList
          css={{
            flexWrap: 'nowrap',
            py: '20px',
            '> div:not(last-child)': {
              mr: '20px',
            },
          }}
          gap={0}
          gameProducts={gameProducts}
        />
      </SimpleBar>
    </Section>
  );
};

export default HomeNewReleasesList;
