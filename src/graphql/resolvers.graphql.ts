import { GraphQLYogaError } from '@graphql-yoga/node';
import type { Game } from '@/types/game.type';
import type { GameProduct } from '@/types/game-product.type';

const resolvers = {
  Query: {
    gameProducts: async (
      _parent: any,
      _args: any,
      _context: any,
      _info: any
    ) => {
      const { limit, released: releasedFilter } = _args?.filter || {};
      const { field: fieldSort, order: orderSort } = _args?.sort || {
        field: 'released',
        order: 'desc',
      };

      const { data: gpData, error } = await _context.supabase
        .from('game_product')
        .select('*')
        .is('is_active', true)
        .order('created_at', { ascending: false })
        .limit(limit || 1000);

      if (error) {
        throw new GraphQLYogaError(`Error: ${error.message}`);
      }

      const gameIdsFlat = gpData.map((gp: any) => gp.game_id).flat();
      const gameIds = [...new Set(gameIdsFlat.map(JSON.stringify))].map(
        JSON.parse as any
      );

      const { data: gameData } = await _context.supabase
        .from('game')
        .select('id, slug, bg_image_offset_pos_x, backdrop_opacity')
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
              genres,
              esrb_rating,
            } = await res.json();

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
              genres: genres.map(({ slug, name }: any) => ({ slug, name })),
              esrbRating: esrb_rating
                ? { slug: esrb_rating.slug, name: esrb_rating.name }
                : null,
            };
          } catch (error: any) {
            throw new Error(error);
          }
        })
      );

      const gameProducts: GameProduct[] = gpData
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
              initialDiscount > 0
                ? Math.min(Math.max(initialDiscount, 0), 100)
                : 0;

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
            ? +new Date(gbB.games[0].released) -
                +new Date(gbA.games[0].released)
            : +new Date(gbA.games[0].released) -
                +new Date(gbB.games[0].released);
        });

      return gameProducts;
    },
    viewer: (_parent: any, _args: any, _context: any, _info: any) => {
      return { id: 1, name: 'John Smith', status: 'cached' };
    },
  },
};

export default resolvers;
