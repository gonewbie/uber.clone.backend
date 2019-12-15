import Chat from '../../../entities/Chat';
import User from '../../../entities/User';
import { GetChatQueryArgs, GetChatResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';


const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (
        _,
        args: GetChatQueryArgs,
        { req }
      ): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne(
            { id: args.chatId },
            { relations: ['messages'] }
          );
          if (chat) {
            if (chat.driverId === user.id || chat.passengerId === user.id) {
              return {
                ok: true,
                error: null,
                chat
              }
            } else {
              return {
                ok: false,
                error: 'Not Authorized',
                chat: null
              }
            }
          } else {
            return {
              ok: false,
              error: 'Chat Not found',
              chat: null
            }
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null
          }
        }
      }
    )
  }
}

export default resolvers;