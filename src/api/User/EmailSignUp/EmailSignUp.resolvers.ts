import { EmailSignUpResponse, EmailSignUpMutationArgs } from '../../../types/graph';
import { Resolvers } from "../../../types/resolvers";
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs,
    ): Promise<EmailSignUpResponse> => {
      try {
        const { email } = args;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: 'existing email. You should log in instead',
            token: null
          }
        } else {
          const newUser = await User.create({ ...args });
          return {
            ok: true,
            error: null,
            token: 'comming soon'
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
}

export default resolvers;