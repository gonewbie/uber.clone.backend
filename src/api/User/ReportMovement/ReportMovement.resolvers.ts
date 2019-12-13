import User from '../../../entities/User';
import { ReportMovementMutationArgs, ReportMovementResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import cleanNullArg from '../../../utils/cleanNullArg';
import privateResolver from '../../../utils/privateResolver';


const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(async (_, args: ReportMovementMutationArgs, { req, pubSub }): Promise<ReportMovementResponse> => {
      const user: User = req.user;
      const notNull: any = cleanNullArg(args);
      try {
        await User.update({ id: user.id }, { ...notNull });
        const updatedUser = { ...user, ...notNull };
        pubSub.publish('driverUpdate', { DriversSubscription: updatedUser });
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    })
  }
}

export default resolvers;