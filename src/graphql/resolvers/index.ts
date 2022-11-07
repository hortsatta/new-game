import { carousels } from './carousel.resolver';
import { cart } from './cart.resolver';
import { gameProducts } from './game-product.resolver';
import { genres } from './genre.resolver';
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
    genres,
    gameProducts,
    carousels,
    cart,
    currentUser,
  },
  Mutation: {
    login,
    register,
    upsertUserAccount,
  },
};
