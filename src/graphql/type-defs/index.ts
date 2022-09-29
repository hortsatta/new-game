import { gameProductTypeDef } from './game-product.type-def';
import { userAccountTypeDef } from './user-account.type-def';

export const typeDefs = `
  enum Sort {
    asc
    desc
  }

  enum GameProductSortField {
    name
    released
  }

  interface Node {
    id: ID!
  }

  input FilterInput {
    lte: String
  }

  ${gameProductTypeDef}

  ${userAccountTypeDef}

  type Query {
    userAccounts: UserAccount
    gameProducts(filter: GameProductFilterInput, sort: GameProductSortInput): [GameProduct]
  }
`;
