import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import cleanNullArg from '../../../utils/cleanNullArg';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      const notNull: any = cleanNullArg(args);
      if (notNull.hasOwnProperty('password')) {
        user.password = notNull['password'];
        user.save();
        delete notNull['password'];
      }

      try {
        await User.update({ id: user.id }, { ...notNull });
        return {
          ok: true,
          error: null
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        }
      }
    })
  }
}

export default resolvers;