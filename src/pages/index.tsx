import { Row } from '@nextui-org/react';
import SimpleBar from 'simplebar-react';
import type { NextPage } from 'next';

import { CarouselType } from '@/types/carousel.type';
import { fetcher } from '@/utils/fetcher.util';
import { BaseCarousel, BaseDivider, BaseTitle } from '@/components/base';
import { GameProductList } from '@/components/game-product';

const items = [
  {
    type: CarouselType.IMAGE,
    content: {
      url: 'https://images6.alphacoders.com/124/1245270.jpg',
    },
  },
  {
    type: CarouselType.IMAGE,
    content: {
      url: 'https://images6.alphacoders.com/124/1245270.jpg',
    },
  },
  {
    type: CarouselType.IMAGE,
    content: {
      url: 'https://images6.alphacoders.com/124/1245270.jpg',
    },
  },
  {
    type: CarouselType.IMAGE,
    content: {
      url: 'https://images6.alphacoders.com/124/1245270.jpg',
    },
  },
];

const query = `
  query HomeQuery($released: FilterInput) {
    newReleasesGameProducts: gameProducts(filter: {
      limit: 10
      released: $released
    }) {
      id
      discount
      price
      finalPrice
      games {
        id
        slug
        name
        metaScore
        released
        bgImage
        website
        parentPlatforms
        developers { name }
        publishers { name }
        genres { name }
        esrbRating { name, slug }
        bgImageOffsetPosX
        backdropOpacity
      }
    }
  }
`;

export const getStaticProps = async () => {
  const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const data = await fetcher(query, { released: { lte: today } });
  return {
    props: { data },
  };
};

const HomePage: NextPage = ({ data: { newReleasesGameProducts } }: any) => (
  <div>
    <BaseCarousel items={items} maxWidth='884px' autoplay={false} />
    <BaseDivider css={{ mt: '44px', mb: '60px' }} />
    <section>
      <Row justify='space-between'>
        <BaseTitle>New Releases</BaseTitle>
      </Row>
      <SimpleBar style={{ width: '100%' }}>
        <GameProductList
          css={{
            flexWrap: 'nowrap',
            py: '20px',
            '> div:not(last-child)': {
              mr: '20px',
            },
          }}
          gap={0}
          gameProducts={newReleasesGameProducts}
        />
      </SimpleBar>
    </section>
  </div>
);

export default HomePage;
