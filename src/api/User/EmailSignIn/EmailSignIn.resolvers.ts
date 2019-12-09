import { EmailSignInResponse, EmailSignInMutationArgs } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
      try {
        const { email, password } = args;
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: 'No User found with that email',
            token: null
          }
        }
        const token = createJWT(user.id);
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token
          }
        } else {
          return {
            ok: false,
            error: 'Wrong password',
            token: null
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