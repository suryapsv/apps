import { makeExecutableSchema } from 'graphql-tools';
//import mocks from './mocks';
import resolvers from './resolvers'

const typeDefs = `
type Query {
  author: Author
  allAuthors: [Author]
  allPosts: [Post]
  allEvents: [Event]
  getEvent(eventType: String): [Event]
  getFortuneCookie: String # we'll use this later
  
}

type Mutation {
  addEvent(hack_name: String, start_date: String, end_date: String): Event
}

type Author {
  id: Int
  firstName: String
  lastName: String
}
type Post {
  id: Int
  title: String
  text: String
  views: Int
}
type Event {
    hack_name: String,
    start_date: String,
    end_date: String,
    details: String,
    org: String,
    eventType: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

export default schema;