// GraphQL modules
import { listingTypeDefs } from "./listing.typeDefs";
import { listingResolvers } from "./listing.resolvers";
import { ApolloServer } from "@apollo/server";

// ✅ Setup Apollo Server (creating server instance)
export const server = new ApolloServer({
  typeDefs: [listingTypeDefs],
  resolvers: [listingResolvers],
});