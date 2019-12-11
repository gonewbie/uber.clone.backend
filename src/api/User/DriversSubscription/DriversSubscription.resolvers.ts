import { withFilter } from "graphql-yoga";
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub, currentUser }) => pubSub.asyncIterator('driverUpdate'),
        (payload, _, { currentUser }) => {
          const user: User = currentUser;
          const {
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng
            }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= userLastLng - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          );
        }
      )
    }
  }
}

export default resolvers;