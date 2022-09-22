import { BaseCarousel } from '@/components/base';
import type { NextPage } from 'next';

import { CarouselType } from '@/types/carousel.type';

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

const Home: NextPage = () => {
  return (
    <div>
      <BaseCarousel items={items} maxWidth='884px' autoplay={false} />
    </div>
  );
};

export default Home;
