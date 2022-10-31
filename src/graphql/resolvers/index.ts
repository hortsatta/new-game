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
    gameProducts,
    userAvatars,
    currentUser,
  },
  Mutation: {
    login,
    register,
    upsertUserAccount,
  },
};
