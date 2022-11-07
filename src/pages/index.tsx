import type { NextPage } from 'next';
import { Image } from '@nextui-org/react';

import { gqlFetcher } from '@/utils/gql-fetcher.util';
import { BaseDivider } from '@/components/base';
import { Carousel } from '@/components/carousel';
import { HomeFeaturedGenresList, HomeNewReleasesList } from '@/components/home';

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
    carousels(filter: { limit: 4 }) {
      id
      content {
        type
        excerpt
        image {
          url
          name
        }
        gameProduct {
          id
          discount
          price
          finalPrice
          games {
            id
            slug
            name
            metaScore
            bgImage
            parentPlatforms
            developers { name }
            publishers { name }
            description
          }
        }
      }
    }
    genres {
      id
      name
      slug
      rawgSlug
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
  return {
    props: { data: { carousels: [], newReleasesGameProducts: [], genres: [] } },
  };
};

const HomePage: NextPage = ({
  data: { carousels, newReleasesGameProducts, genres },
}: any) => (
  <div>
    <Carousel
      css={{ position: 'relative' }}
      items={carousels}
      maxWidth='884px'
      autoplaySpeed={8000}
    />
    <BaseDivider css={{ mt: '44px', mb: '60px' }} />
    <HomeNewReleasesList
      css={{ mb: '40px' }}
      gameProducts={newReleasesGameProducts}
    />
    <HomeFeaturedGenresList css={{ mb: '70px' }} genres={genres} />
    <Image
      src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/intermission.png`}
      alt='intermission'
      width={1454}
      height={397}
    />
  </div>
);

export default HomePage;
