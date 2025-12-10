import prisma from "../../config/db";
import { validate as isUUID } from "uuid";
import { parseKeyValueString } from "../../utils/parse";

export async function CatalogDataHandling(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 15;
    const sort = query.sort;
    const filter = query.filter;

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
        skip: (page - 1) * limit,
        take: limit,
        orderBy: finalSortArray.length ? finalSortArray : undefined // Eg:- finalSortArray --> [{title: 'asc'}, {price: 'asc'}]
    })
    return { listingData, totalCount };
}

// Fetch Product details by ID
export async function fetchDetailsOnIdBasis(id: string) {
    if (!isUUID(id)) {
        return { error: "Invalid ID format" };
    }
    const listingDetails = await prisma.listingAppSide.findUnique({ where: { id } })
    return listingDetails;
}