export const gameProductTypeDef = `
  enum GameProductSortField {
    name
    released
  }

  interface IGameProduct {
    games: [Game]
    discount: Float
    price: Float
    finalPrice: Float
  }

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

  type Game implements Node & AuditTrail {
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
    bgImageOffsetPosX: Float
    backdropOpacity: Float
    isActive: Boolean
    createdAt: String
  }

  type GameProduct implements IGameProduct & Node & AuditTrail {
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
