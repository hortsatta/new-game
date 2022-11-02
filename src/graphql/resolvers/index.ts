import { carousels } from './carousel.resolver';
import { gameProducts } from './game-product.resolver';
import {
  currentUser,
  login,
  register,
  upsertUserAccount,
  userAvatars,
} from './user-account.resolver';

export const resolvers = {
  Query: {
    userAvatars,
    gameProducts,
    carousels,
    currentUser,
  },
  Mutation: {
    login,
    register,
    upsertUserAccount,
  },
};
