import { gameProducts } from './game-product.resolver';
import { userAccounts } from './user-account.resolver';

export const resolvers = {
  Query: {
    gameProducts,
    userAccounts,
  },
};
