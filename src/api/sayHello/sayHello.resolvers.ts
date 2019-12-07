import { SayHelloQueryArgs, SayHelloResponse } from "../../types/graph";

const resolvers = {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): SayHelloResponse => {
      return {
        error: true,
        text: `hello ${args.name}`
      }
    }
  }
}

export default resolvers;