import { ApolloServer, gql } from 'apollo-server-lambda';
import { CommentController } from './controller/user.controller';

const typeDefs = gql`
  type Comment {
    msgId: Int
    userId: String
    content: String
    createdAt: String
    deleted: Boolean
  }
  type Query {
    get(itemId: String): [Comment]
  }
  type Mutation {
    add(itemId: String, userId: String, content: String): [Comment]
    edit(itemId: String, msgId: Int, userId: String, content: String): [Comment]
    delete(itemId: String, msgId: Int, userId: String): [Comment]
  }
`;

const resolvers = {
  Query: {
    get: (root, args) => {
      const service = new CommentController();
      return service.get(args.itemId);
    },
  },
  Mutation: {
    add: (roots, args) => {
      const service = new CommentController();
      return service.add(args.itemId, args.userId, args.content);
    },
    edit: (roots, args) => {

    },
    delete: (roots, args) => {

    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.graphqlHandler = server.createHandler();