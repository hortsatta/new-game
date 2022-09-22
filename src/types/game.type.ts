type Platform = {
  slug: string;
  name: string;
};

type Developer = {
  slug: string;
  name: string;
};

type Publisher = {
  slug: string;
  name: string;
};

type Genre = {
  slug: string;
  name: string;
};

type EsrbRating = {
  slug: string;
  name: string;
};

type Game = {
  id: number;
  slug: string;
  name: string;
  description: string;
  metacritic: number;
  metacriticUrl: string;
  released: string;
  tba: boolean;
  bgImage: string;
  bgImageAdditional: string;
  website: string;
  parentPlatforms: string[];
  platforms: Platform[];
  developers: Developer[];
  publishers: Publisher[];
  genres: Genre[];
  esrbRating: EsrbRating;
  isActive: boolean;
};

export type { Platform, Developer, Publisher, EsrbRating, Game };
