import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(async ( _, __, { req }) => {
      const user: User = req.user;
      user.isDriving = !user.isDriving;
      user.save();
      return {
        ok: true,
        error: null
      }
    })
  }
}

export default resolvers;