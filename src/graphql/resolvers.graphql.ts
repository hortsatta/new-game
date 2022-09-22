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
      const { limit } = _args || {};

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
        .select('id, slug')
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
              slug,
              name,
              description,
              metacritic,
              metacriticUrl: metacritic_url,
              released,
              tba,
              bgImage: background_image,
              bgImageAdditional: background_image_additional,
              website,
              parentPlatforms: parent_platforms.map(
                ({ platform }: any) => platform.slug
              ),
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

      const gameProducts: GameProduct[] = gpData.map(
        ({ created_at, is_active, game_id, ...moreGp }: any) => {
          const games = game_id.map((id: number) =>
            gameDetails.find((gd: any) => gd.id === id)
          );

          return {
            ...moreGp,
            createdAt: created_at,
            isActive: is_active,
            games,
          };
        }
      );

      return gameProducts;
    },
    viewer: (_parent: any, _args: any, _context: any, _info: any) => {
      return { id: 1, name: 'John Smith', status: 'cached' };
    },
  },
};

export default resolvers;
