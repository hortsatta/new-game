import { CSS, Grid } from '@nextui-org/react';
import GenreCard from './genre-card.component';
import type { Genre } from '@/types/genre.type';

type Props = {
  genres: Genre[];
  css?: CSS;
  itemCss?: CSS;
  gap?: number | undefined;
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
};

const GenreList = ({ genres, itemCss, ...moreProps }: Props) => (
  <Grid.Container gap={2} {...moreProps}>
    {genres.map((g: Genre) => (
      <Grid key={g.id} css={itemCss}>
        <GenreCard genre={g} />
      </Grid>
    ))}
  </Grid.Container>
);

export default GenreList;
