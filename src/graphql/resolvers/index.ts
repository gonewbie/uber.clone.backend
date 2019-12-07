import { IResolvers } from 'graphql-tools';

import noteResolver from './note';
import customResolver from './custom';

// @ts-ignore
const resolvers: IResolvers = [noteResolver, customResolver]

export default resolvers;