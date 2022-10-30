import { gameProductTypeDef } from './game-product.type-def';
import { userAccountTypeDef } from './user-account.type-def';

export const typeDefs = `
  scalar File

  enum Sort {
    asc
    desc
  }

  interface Node {
    id: ID!
  }

  interface AuditTrail {
    isActive: Boolean
    createdAt: String
  }

  input FilterInput {
    lte: String
  }

  ${gameProductTypeDef}

  ${userAccountTypeDef}

  type Query {
    userAccounts: UserAccount
    userAvatars(filter: UserAvatarFilterInput): [UserAvatar]
    gameProducts(filter: GameProductFilterInput, sort: GameProductSortInput): [GameProduct]
  }

  type Mutation {
    register(email: String, password: String): UserAccount
    login(email: String, password: String): UserAccount
    upsertUserAccount(data: UserAccountUpsertInput): UserAccount
  }
`;
