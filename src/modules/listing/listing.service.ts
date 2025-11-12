// GraphQL modules
import { listingTypeDefs } from "./listing.typeDefs";
import { listingResolvers } from "./listing.resolvers";
import { ApolloServer } from "@apollo/server";

// ✅ Setup Apollo Server (as middleware)
export const server = new ApolloServer({
  typeDefs: [listingTypeDefs],
  resolvers: [listingResolvers],
});