import type { NextPage } from 'next';

import { BaseCarousel } from '@/components/base';
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
    <pre>{gameProducts.length}</pre>
    <BaseCarousel items={items} maxWidth='884px' autoplay={false} />
  </div>
);

export default HomePage;
