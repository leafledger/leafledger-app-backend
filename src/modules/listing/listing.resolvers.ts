import prisma from "../../config/db";
import { createListing as createListingService } from "./listing.service";

export const listingResolvers = {
  Query: {
    listings: () => prisma.listing.findMany(),
    listing: (_: any, { id }: { id: string }) =>
      prisma.listing.findUnique({ where: { id } }),
  },
  Mutation: {
    createListing: async (_: any, args: any) =>{
      const listing = await createListingService(args.input);
      return listing;
    }
  },
};
