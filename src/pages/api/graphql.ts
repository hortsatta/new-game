import { createServer } from '@graphql-yoga/node';
import { typeDefs } from '@/graphql/type-defs';
import { resolvers } from '@/graphql/resolvers';
import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/supabase-client.util';

export const config = {
  api: { bodyParser: false },
};

export default createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: {
    typeDefs,
    resolvers,
  },
  context: (ctx) => ({ ...ctx, supabase }),
  endpoint: '/api/graphql',
  graphiql: process.env.NODE_ENV !== 'production',
});
