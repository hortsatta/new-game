import { gameProducts } from './game-product.resolver';
import {
  register,
  upsertUserAccount,
  userAccounts,
  userAvatars,
} from './user-account.resolver';

export const resolvers = {
  Query: {
    gameProducts,
    userAccounts,
    userAvatars,
  },
  Mutation: {
    register,
    upsertUserAccount,
  },
};
