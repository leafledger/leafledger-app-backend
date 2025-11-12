// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import prisma from "../../config/db";

export const listingResolvers = {
  Query: {
    listings: () => prisma.listing.findMany(),
    listing: (_: any, { id }: { id: string }) =>
      prisma.listing.findUnique({ where: { id } }),
  },
  Mutation: {
    createListing: (_: any, args: any) =>
      prisma.listing.create({ data: args }),
  },
};
