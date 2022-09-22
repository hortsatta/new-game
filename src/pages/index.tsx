import type { NextPage } from 'next';

import { BaseCarousel, BaseDivider } from '@/components/base';
import { CarouselType } from '@/types/carousel.type';
import { fetcher } from '@/utils/fetcher.util';

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

const fooQuery = `
  query Foo {
    gameProducts {
      id
      price
      discount
      isActive
      createdAt
    }
  }
`;

export const getStaticProps = async () => {
  const data = await fetcher(fooQuery);
  return {
    props: { data },
  };
};

const HomePage: NextPage = ({ data: { gameProducts } }: any) => (
  <div>
    <BaseCarousel items={items} maxWidth='884px' autoplay={false} />
    <BaseDivider css={{ my: '60px' }} />
  </div>
);

export default HomePage;
