import { CarouselType } from '@/types/carousel.type';
import { gqlFetcher } from '@/utils/gql-fetcher.util';
import { BaseCarousel, BaseDivider } from '@/components/base';
import { HomeNewReleasesList } from '@/components/home';

import type { NextPage } from 'next';

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
  try {
    const data = await gqlFetcher(query, { released: { lte: today } });
    return { props: { data } };
  } catch (error) {
    console.error(error);
  }
  return { props: { data: { newReleasesGameProducts: [] } } };
};

const HomePage: NextPage = ({ data: { newReleasesGameProducts } }: any) => (
  <div>
    <BaseCarousel items={items} maxWidth='884px' autoplay={false} />
    <BaseDivider css={{ mt: '44px', mb: '60px' }} />
    <HomeNewReleasesList gameProducts={newReleasesGameProducts} />
  </div>
);

export default HomePage;
