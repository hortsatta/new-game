import { parse } from 'cookie';

import { gqlFetcher } from '@/utils/gql-fetcher.util';
import { removeAuthCookie } from '@/utils/cookie.util';
import { BaseScene } from '@/components/base';
import { CartList } from '@/components/cart';

import type { NextApiRequest, NextApiResponse, NextPage } from 'next';

// const gps: GameProduct[] = [
//   {
//     id: 1,
//     discount: 0,
//     price: 10,
//     finalPrice: 10,
//     games: [
//       {
//         id: 1,
//         slug: 'Game One',
//         name: 'Game One',
//         description: '',
//         metaScore: 1,
//         released: 'released',
//         tba: false,
//         bgImage: '',
//         website: '',
//         parentPlatforms: [],
//         platforms: [],
//         developers: [{ name: 'Developer', slug: 'developer' }],
//         publishers: [{ name: 'Publisher', slug: 'publisher' }],
//         genres: [],
//         isActive: true,
//         esrbRating: {
//           slug: '',
//           name: '',
//         },
//       },
//     ],
//   },
//   {
//     id: 2,
//     discount: 0,
//     price: 20,
//     finalPrice: 20,
//     games: [
//       {
//         id: 2,
//         slug: 'Game Two',
//         name: 'Game Two',
//         description: '',
//         metaScore: 1,
//         released: 'released',
//         tba: false,
//         bgImage: '',
//         website: '',
//         parentPlatforms: [],
//         platforms: [],
//         developers: [{ name: 'Developer', slug: 'developer' }],
//         publishers: [{ name: 'Publisher', slug: 'publisher' }],
//         genres: [],
//         isActive: true,
//         esrbRating: {
//           slug: '',
//           name: '',
//         },
//       },
//     ],
//   },
//   {
//     id: 3,
//     discount: 0,
//     price: 15,
//     finalPrice: 15,
//     games: [
//       {
//         id: 3,
//         slug: 'Game Three',
//         name: 'Game Three',
//         description: '',
//         metaScore: 1,
//         released: 'released',
//         tba: false,
//         bgImage: '',
//         website: '',
//         parentPlatforms: [],
//         platforms: [],
//         developers: [{ name: 'Developer', slug: 'developer' }],
//         publishers: [{ name: 'Publisher', slug: 'publisher' }],
//         genres: [],
//         isActive: true,
//         esrbRating: {
//           slug: '',
//           name: '',
//         },
//       },
//     ],
//   },
// ];

// const cart: Cart = {
//   id: 1,
//   paymentIntent: '',
//   userId: 'user_id',
//   cartItems: [
//     { quantity: 1, gameProduct: gps[1] },
//     { quantity: 2, gameProduct: gps[0] },
//     { quantity: 1, gameProduct: gps[2] },
//   ],
// };

const currentUserQuery = `
  query CartUserQuery($token: String) {
    currentUser(token: $token) {
      userId
      email
      displayName
    }
  }
`;

const cartQuery = `
  query CartQuery($filter: CartFilterInput) {
    cart(filter: $filter) {
      userId
      paymentIntent
      cartItems {
        quantity
        gameProduct {
          id
          discount
          price
          finalPrice
          games {
            slug
            name
            parentPlatforms
            developers { name }
            publishers { name }
          }
        }
      }
    }
  }
`;

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  try {
    const { token } = parse(req.headers.cookie || '');
    const { currentUser } = await gqlFetcher(currentUserQuery, { token });

    if (!currentUser) {
      return {
        props: {},
        redirect: { destination: '/login', permanent: false },
      };
    }

    const { cart } = await gqlFetcher(cartQuery, {
      filter: { userId: currentUser.userId },
    });

    return { props: { data: { currentUser, cart: cart || {} } } };
  } catch (error) {
    removeAuthCookie(res);
    console.error(error);
  }
  return { props: {}, redirect: { destination: '/login', permanent: false } };
};

const CartPage: NextPage = ({ data: { cart } }: any) => (
  <BaseScene>
    <CartList cart={cart} />
  </BaseScene>
);

export default CartPage;
