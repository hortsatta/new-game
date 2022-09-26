import type { NextPage } from 'next';

import { BaseCarousel, BaseDivider } from '@/components/base';
import { CarouselType } from '@/types/carousel.type';
import { fetcher } from '@/utils/fetcher.util';
import { GameProductCard } from '@/components/game-product';

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
    <BaseDivider css={{ mt: '44px', mb: '60px' }} />
    <GameProductCard
      gameProduct={{
        id: 1,
        price: 59.99,
        discount: 0,
        createdAt: '2022-09-02',
        isActive: true,
        games: [
          {
            id: 1,
            slug: 'cult',
            name: 'Cult of the Lamb',
            description: 'Meme',
            metacritic: 90,
            released: '2022-09-02',
            tba: false,
            bgImage:
              'https://media.rawg.io/media/resize/1280/-/games/400/4002e3aa52cf33d184f0f74cc2348134.jpg',
            website: 'https://cultofthelamb.com/',
            parentPlatforms: ['playstation', 'xbox', 'nintendo', 'pc'],
            platforms: [
              { slug: 'Xbox One', name: 'xbox-one' },
              { slug: 'Xbox Series S/X', name: 'xbox-series-x' },
              { slug: 'PlayStation 5', name: 'playStation5' },
              { slug: 'Nintendo Switch', name: 'nintendo-switch' },
              { slug: 'PC', name: 'pc' },
            ],
            developers: [
              { name: 'Vicarious Visions', slug: 'vicarious-visions' },
            ],
            publishers: [
              { name: 'Activision Blizzard', slug: 'activision-blizzard' },
              {
                name: 'Blizzard Entertainment',
                slug: 'blizzard-entertainment',
              },
            ],
            genres: [
              { name: 'Action', slug: 'action' },
              { name: 'RPG', slug: 'role-playing-games-rpg' },
            ],
            esrbRating: { name: 'Adults Only', slug: 'adults-only' },
            isActive: true,
          },
        ],
      }}
    />
  </div>
);

export default HomePage;
