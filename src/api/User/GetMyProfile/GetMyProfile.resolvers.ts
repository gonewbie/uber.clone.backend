import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, context) => {
      const { req: { user } } = context;
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
}

export default resolvers;