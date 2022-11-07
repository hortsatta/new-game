import { GraphQLYogaError } from '@graphql-yoga/node';
import { getGenres } from './genre.resolver';

import type { Game } from '@/types/game.type';
import type { GameProduct } from '@/types/game-product.type';
import type { Genre } from '@/types/genre.type';

const getGameProducts = async (
  supabase: any,
  filter?: any,
  sort?: any
): Promise<GameProduct[]> => {
  const { limit, released: releasedFilter, ids: idsFilter } = filter || {};
  const { field: fieldSort, order: orderSort } = sort || {
    field: 'created_at',
    order: 'desc',
  };

  let gameProductQuery = supabase
    .from('game_product')
    .select()
    .is('is_active', true);

  if (idsFilter && idsFilter.length) {
    gameProductQuery = gameProductQuery.in('id', idsFilter);
  }

  if (fieldSort) {
    gameProductQuery = gameProductQuery.order(fieldSort, {
      ascending: orderSort !== 'desc',
    });
  }

  if (limit) {
    gameProductQuery = gameProductQuery.limit(limit || 1000);
  }

  const { data: gpData, error } = await gameProductQuery;

  if (error) {
    throw new GraphQLYogaError(`Error: ${error.message}`);
  }

  // Get all genres
  const gameGenres = await getGenres(supabase);

  const gameIdsFlat = gpData.map((gp: any) => gp.game_id).flat();
  const gameIds = [...new Set(gameIdsFlat.map(JSON.stringify))].map(
    JSON.parse as any
  );

  const { data: gameData } = await supabase
    .from('game')
    .select('id, slug, genres, bg_image_offset_pos_x, backdrop_opacity')
    .is('is_active', true)
    .in('id', gameIds);

  const gameDetails: Game[] = await Promise.all(
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
          esrb_rating,
        } = await res.json();

        const genres = g.genres.map((genreId: number) =>
          gameGenres.find((gg: Genre) => gg.id === genreId)
        );

        return {
          id: g.id,
          bgImageOffsetPosX: g.bg_image_offset_pos_x,
          backdropOpacity: g.backdrop_opacity || 0.6,
          slug,
          name,
          description,
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
          genres,
          esrbRating: esrb_rating
            ? { slug: esrb_rating.slug, name: esrb_rating.name }
            : null,
        };
      } catch (error: any) {
        throw new GraphQLYogaError(`Error: ${error.message}`);
      }
    })
  );

  return gpData
    .map(
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
    )
    .filter((gp: GameProduct) => {
      const { lte } = releasedFilter || {};

      if (lte) {
        const valid = !gp.games.find(
          (g) => !g.released || new Date(g.released) >= new Date(lte)
        );
        if (!valid) {
          return false;
        }
      }

      return true;
    })
    .sort((gbA: GameProduct, gbB: GameProduct) => {
      return orderSort === 'desc'
        ? +new Date(gbB.games[0].released) - +new Date(gbA.games[0].released)
        : +new Date(gbA.games[0].released) - +new Date(gbB.games[0].released);
    });
};

const gameProducts = (
  _parent: any,
  { filter, sort }: any,
  { supabase }: any,
  _info: any
) => getGameProducts(supabase, filter, sort);

export { getGameProducts, gameProducts };
