import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';
import privateResolver from '../../../utils/privateResolver';
import Verification from '../../../entities/Verification';


const resovlers: Resolvers = {
  Mutation: {
    ComPleteEmailVerification: privateResolver(async (
      _,
      args: CompleteEmailVerificationMutationArgs,
      { req }
    ): Promise<CompleteEmailVerificationResponse> => {
      const user: User = req.user;
      const { key } = args;
      if (user.email && !user.verifiedEmail) {
        try {
          const verification = await Verification.findOne({
            key,
            payload: user.email
          });
          if (verification) {
            user.verifiedEmail = true;
            user.save();
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: 'Can\'t verify the email'
            }
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          }
        }
      } else {
        return {
          ok: false,
          error: 'no email to verify'
        }
      }
    })
  }
}

export default resovlers;