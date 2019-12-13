import User from "../../../entities/User";
import { GetMyPlacesResponse } from '../../../types/graph';
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async( _, __, { req }): Promise<GetMyPlacesResponse> => {
      try {
        const user: any = await User.findOne(
          { id: req.user.id },
          {relations: ['places']}
        );
        if (user) {
          return {
            ok: true,
            error: null,
            places: user.places
          }
        } else {
          return {
            ok: false,
            error: 'User not found',
            places: null
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          places: null
        }
      }
    })
  }
}

export default resolvers;