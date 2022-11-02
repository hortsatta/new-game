import { GraphQLYogaError } from '@graphql-yoga/node';
import striptags from 'striptags';
import type { GameProduct } from '@/types/game-product.type';

export const carousels = async (
  _parent: any,
  { filter, sort }: any,
  { supabase }: any,
  _info: any
) => {
  const { limit } = filter || {};
  const { field: fieldSort, order: orderSort } = sort || {
    field: 'created_at',
    order: 'desc',
  };

  const { data: carouselData, error: carouselError } = await supabase
    .from('carousel')
    .select()
    .is('is_active', true)
    .order(fieldSort, { ascending: orderSort !== 'desc' })
    .limit(limit || 1000);

  if (carouselError) {
    throw new GraphQLYogaError(`Error: ${carouselError.message}`);
  }

  const gpIds = carouselData.map((item: any) => item.content.game_product_id);
  let gameProducts: GameProduct[] = [];

  if (gpIds.length) {
    const { data: gpData } = await supabase
      .from('game_product')
      .select()
      .is('is_active', true)
      .in('id', gpIds);

    const gameIdsFlat = gpData.map((gp: any) => gp.game_id).flat();
    const gameIds = [...new Set(gameIdsFlat.map(JSON.stringify))].map(
      JSON.parse as any
    );

    const { data: gameData } = await supabase
      .from('game')
      .select('id, slug')
      .is('is_active', true)
      .in('id', gameIds);

    const gameDetails = await Promise.all(
      gameData.map(async (g: any) => {
        try {
          const res = await fetch(
            `${process.env.RAWG_API_URL}/games/${g.slug}?key=${process.env.RAWG_API_KEY}`
          );

          const {
            slug,
            name,
            description,
            metacritic,
            metacritic_url,
            released,
            tba,
            background_image,
            background_image_additional,
            website,
            parent_platforms,
            platforms,
            developers,
            publishers,
            genres,
            esrb_rating,
          } = await res.json();

          const formattedDescription = striptags(
            description.split('<br />')[0]
          );

          return {
            id: g.id,
            slug,
            name,
            description: formattedDescription,
            metaScore: +metacritic / 2 / 10,
            metacriticUrl: metacritic_url,
            released,
            tba,
            bgImage: background_image,
            bgImageAdditional: background_image_additional,
            website,
            parentPlatforms: parent_platforms
              .map(({ platform }: any) => platform.slug)
              .filter((p: string) => p !== 'mac' && p !== 'linux'),
            platforms: platforms.map(({ platform }: any) => ({
              slug: platform.slug,
              name: platform.name,
            })),
            developers: developers.map(({ slug, name }: any) => ({
              slug,
              name,
            })),
            publishers: publishers.map(({ slug, name }: any) => ({
              slug,
              name,
            })),
            genres: genres.map(({ slug, name }: any) => ({ slug, name })),
            esrbRating: esrb_rating
              ? { slug: esrb_rating.slug, name: esrb_rating.name }
              : null,
          };
        } catch (error: any) {
          throw new GraphQLYogaError(`Error: ${error.message}`);
        }
      })
    );

    gameProducts = gpData.map(
      ({
        created_at,
        is_active,
        game_id,
        discount: initialDiscount,
        price,
        ...moreGp
      }: any) => {
        const discount =
          initialDiscount > 0 ? Math.min(Math.max(initialDiscount, 0), 100) : 0;

        const finalPrice = Number(
          !!discount
            ? (price * ((100 - discount) / 100)).toFixed(2)
            : price.toFixed(2)
        );

        const games = game_id.map((id: number) =>
          gameDetails.find((gd: any) => gd.id === id)
        );

        return {
          ...moreGp,
          createdAt: created_at,
          isActive: is_active,
          discount,
          price,
          finalPrice,
          games,
        };
      }
    );

    console.log('carouselData', gameDetails);
  }

  return carouselData.map(({ content, ...moreItem }: any, index: number) => {
    const commonData = {
      id: moreItem.id,
      createdAt: moreItem.created_at,
      isActive: moreItem.is_active,
      index,
    };

    if (content.type === 'game') {
      const { game_product_id, image_url: imageUrl, ...moreContent } = content;
      const gameProduct = {
        ...gameProducts.find((gp) => gp.id === game_product_id),
        imageUrl,
      };
      return {
        ...commonData,
        content: {
          ...moreContent,
          gameProduct,
        },
      };
    } else {
      return { ...commonData, content };
    }
  });
};
