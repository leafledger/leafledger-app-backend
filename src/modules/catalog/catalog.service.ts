import prisma from "../../config/db";
import { validate as isUUID } from "uuid";
import { parseKeyValueString } from "../../utils/parse";

export async function CatalogDataHandling(req: any) {

    const page_no = Number(req.body?.page_no) || 1;
    const page_size = Number(req.query?.page_size) || 15;
    const sort = req.body?.sort;
    const filter = req.body?.filter;

    const finalSortArray = sort ? parseKeyValueString(sort, (key, value) => (
        { [key]: value.toLowerCase() }
    )) : []

    const finalfilterArray = filter ? parseKeyValueString(filter, (key, value) => (
        { [key]: { contains: value, mode: "insensitive" } }
    )) : []

    // 1. Total records in DB
    const totalCount = await prisma.listingAppSide.count();

    // 2. Records after filtering, sorting, and pagination
    let listingData = await prisma.listingAppSide.findMany({
        where: finalfilterArray.length ? {
            AND: finalfilterArray  // Eg:- finalfilterArray --> [{category: {contains: 'pre-roll', mode: 'insensitive' }},{type: {contains: 'indica', mode: 'insensitive'}}]
        } : {},
        skip: (page_no - 1) * page_size,
        take: page_size,
        orderBy: finalSortArray.length ? finalSortArray : undefined // Eg:- finalSortArray --> [{title: 'asc'}, {price: 'asc'}]
    })
    return { listingData, totalCount, page_no };
}

// Fetch Product details by ID
export async function fetchDetailsOnIdBasis(id: string) {
    if (!isUUID(id)) {
        return { error: "Invalid ID format" };
    }
    const listingDetails = await prisma.listingAppSide.findUnique({ where: { id } })
    return listingDetails;
}