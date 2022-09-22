const typeDefs = `
  type User {
    id: ID!
    name: String!
    status: String!
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

  type Game {
    id: ID!
    slug: String
    name: String
    description: String
    metacritic: Int
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
}

  type GameProduct {
    id: ID!
    games: [Game]
    price: Float
    discount: Float
    isActive: Boolean
    createdAt: String
  }

  type Query {
    viewer: User
    gameProducts: [GameProduct]
  }
`;

export default typeDefs;
