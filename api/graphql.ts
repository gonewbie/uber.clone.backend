import { ApolloServer } from 'apollo-server-lambda';
import { getConnection } from '../src/database';

import typeDefs from '../src/graphql/schema';
import resolvers from '../src/graphql/resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const dbConn = await getConnection();

    return { dbConn };
  },
  playground: true,
  introspection: true
});

exports.graphqlHandler = apolloServer.createHandler();