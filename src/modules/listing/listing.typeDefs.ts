import { gql } from "graphql-tag";

export const listingTypeDefs = gql`
  scalar JSON

  type Listing {
    id: ID!
    source_id: String!
    origin: String!
    source: String!
    variant_id: String!
    payload: JSON
    created_at: String
    updated_at: String
    checker_at: String
    menu_checked_at: String
    removed_at: String
    url: String!
  }

  type Query {
    listings: [Listing!]!
    listing(id: ID!): Listing
  }

  type Mutation {
    createListing(
      source_id: String!
      origin: String!
      source: String!
      variant_id: String!
      payload: JSON
      url: String!
    ): Listing!
  }
`;
