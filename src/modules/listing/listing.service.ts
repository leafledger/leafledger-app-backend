import prisma from "../../config/db";
import { CreateListingInput } from "./listing.types";

// creating new list and return immediate
export async function createListing(data: CreateListingInput) {
  const listing = await prisma.listing.create({ data });
  return listing; // new list created and retured
}
