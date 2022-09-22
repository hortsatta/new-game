import { createServer } from '@graphql-yoga/node';
import { resolvers, typeDefs } from '@/graphql';
import { supabase } from '@/utils/supabase-client.util';

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: () => ({
    supabase,
  }),
  endpoint: '/api/graphql',
  graphiql: process.env.NODE_ENV !== 'production',
});

export default server;
