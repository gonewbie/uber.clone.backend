const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe:
        (_, __, { pubSub, currentUser }) => {
          console.log(currentUser);
          pubSub.asyncIterator('driverUpdate');
        }
    }
  }
}

export default resolvers;