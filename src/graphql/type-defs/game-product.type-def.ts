export const gameProductTypeDef = `
  type Platform {
    slug: String
    name: String
  }

  type Developer {
    slug: String
    name: String
  }

  type Publisher {
    slug: String
    name: String
  }

  type Genre {
    slug: String
    name: String
  }

  type EsrbRating {
    slug: String
    name: String
  }

  type Game implements Node {
    id: ID!
    slug: String
    name: String
    description: String
    metaScore: Float
    metacriticUrl: String
    released: String
    tba: Boolean
    bgImage: String
    bgImageAdditional: String
    website: String
    parentPlatforms: [String]
    platforms: [Platform]
    developers: [Developer]
    publishers: [Publisher]
    genres: [Genre]
    esrbRating: EsrbRating
    isActive: Boolean
    bgImageOffsetPosX: Float
    backdropOpacity: Float
  }

  type GameProduct implements Node {
    id: ID!
    games: [Game]
    discount: Float
    price: Float
    finalPrice: Float
    isActive: Boolean
    createdAt: String
  }

  input GameProductFilterInput {
    limit: Int
    released: FilterInput
    tba: Boolean
  }

  input GameProductSortInput {
    field: GameProductSortField
    order: Sort
  }
`;
