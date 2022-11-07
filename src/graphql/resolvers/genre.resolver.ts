import { GraphQLYogaError } from '@graphql-yoga/node';
import type { Genre } from '@/types/genre.type';

const getGenres = async (supabase: any, sort?: any): Promise<Genre[]> => {
  const { field: fieldSort, order: orderSort } = sort || {
    field: 'name',
    order: 'asc',
  };

  const { data: genreData, error: genreError } = await supabase
    .from('genre')
    .select()
    .is('is_active', true)
    .order(fieldSort, { ascending: orderSort !== 'desc' });

  if (genreError) {
    throw new GraphQLYogaError(`Error: ${genreError.message}`);
  }

  return genreData.map(
    ({ rawg_slug, is_active, created_at, ...moreGenre }: any) => ({
      ...moreGenre,
      rawgSlug: rawg_slug,
      isActive: is_active,
      createdAt: created_at,
    })
  );
};

const genres = (_parent: any, { sort }: any, { supabase }: any, _info: any) =>
  getGenres(supabase, sort);

export { genres, getGenres };
