import User from '../../../entities/User';
import { ReportMovementMutationArgs, ReportMovementResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import cleanNullArgs from '../../../utils/cleanNullArgs';
import privateResolver from '../../../utils/privateResolver';


const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(async (_, args: ReportMovementMutationArgs, { req }): Promise<ReportMovementResponse> => {
      const user: User = req.user;
      const notNull: any = cleanNullArgs(args);
      try {
        await User.update({ id: user.id }, { ...notNull });
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