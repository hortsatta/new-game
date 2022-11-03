import { parse } from 'cookie';

import { gqlFetcher } from '@/utils/gql-fetcher.util';
import { removeAuthCookie } from '@/utils/cookie.util';
import { BaseScene } from '@/components/base';

import type { NextApiRequest, NextApiResponse, NextPage } from 'next';

const query = `
  query GetCurrentUserQuery($token: String) {
    currentUser(token: $token) {
      id
      email
      displayName
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
    const { currentUser } = await gqlFetcher(query, { token });
    return !currentUser
      ? { props: {}, redirect: { destination: '/login', permanent: false } }
      : { props: { data: currentUser } };
  } catch (error) {
    removeAuthCookie(res);
    console.error(error);
  }
  return { props: {}, redirect: { destination: '/login', permanent: false } };
};

// const Center = styled('div', {
//   d: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flex: 1,
// });

const UserPage: NextPage = ({ data: { currentUser } }: any) => (
  <BaseScene>User</BaseScene>
);

export default UserPage;
