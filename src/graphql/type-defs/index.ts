import { carouselTypeDef } from './carousel.type-def';
import { cartTypeDef } from './cart.type-def';
import { gameProductTypeDef } from './game-product.type-def';
import { genreTypeDef } from './genre.type-def';
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

  ${genreTypeDef}

  ${gameProductTypeDef}

  ${userAccountTypeDef}

  ${cartTypeDef}

  ${carouselTypeDef}
  
  type Query {
    userAvatars(filter: UserAvatarFilterInput): [UserAvatar]
    carousels(filter: CarouselFilterInput, sort: CarouselSortInput): [Carousel]
    genres(sort: GenreSortInput): [Genre]
    gameProducts(filter: GameProductFilterInput, sort: GameProductSortInput): [GameProduct]
    cart(filter: CartFilterInput): Cart
    currentUser(token: String): UserAccount
  }

  type Mutation {
    login(email: String, password: String): UserAccount
    register(email: String, password: String): UserAccount
    upsertUserAccount(data: UserAccountUpsertInput): UserAccount
  }
`;

// upsertCart
// upsertCartItems
