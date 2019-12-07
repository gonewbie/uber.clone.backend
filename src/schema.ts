import { IResolvers } from 'graphql-middleware/dist/types';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { GraphQLSchema } from 'graphql';

const allTypes: GraphQLSchema[] = fileLoader(
  path.join(__dirname, './api/**/*.graphql')
);

const allResolvers: IResolvers[] = fileLoader(
  path.join(__dirname, './api/**/*.resolvers.*')
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;