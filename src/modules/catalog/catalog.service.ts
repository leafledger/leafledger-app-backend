import prisma from '../../config/db';
import { validate as isUUID } from 'uuid';
import { parseKeyValueString } from '../../utils/parse';
import { CatalogQueryStringProp } from './catalog.types';
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

// Constants
const allowedSortKeys = ['title', 'price', 'category', 'location', 'createdAt'];
const allowedFilterKeys = ['title', 'category', 'location', 'type'];

// Default values
const PAGE_NO_DEFAULT = 1;
const PAGE_SIZE_DEFAULT = 15;

export async function catalogDataHandling(data: CatalogQueryStringProp) {
  // 1. Data storing or converting
  const { sort, filter } = data;
  const page_no = Number(data.page_no) || PAGE_NO_DEFAULT;
  const page_size = Number(data.page_size) || PAGE_SIZE_DEFAULT;

  // 2. Structuring Filter and Sort for DB as in input
  const finalSortArray = sort
    ? parseKeyValueString(
        'sort',
        sort,
        (key, value) => {
          // Validate sort direction
          const direction = value.toLowerCase() === 'desc' ? 'desc' : 'asc';
          return { [key]: direction };
        },
        allowedSortKeys,
      )
    : [];

  const finalfilterArray = filter
    ? parseKeyValueString(
        'filter',
        filter,
        (key, value) => ({ [key]: { contains: value, mode: 'insensitive' } }),
        allowedFilterKeys,
      )
    : [];

  // 3. Total records in DB when filter applies
  const totalCount = await prisma.listingAppSide.count({
    where: {
      AND: finalfilterArray,
    },
  });

  const totalPages = Math.ceil(totalCount / page_size);

  // 4. Records after filtering, sorting, or pagination
  let listingData = await prisma.listingAppSide.findMany({
    where: finalfilterArray.length
      ? {
          AND: finalfilterArray, // Eg:- finalfilterArray --> [{category: {contains: 'pre-roll', mode: 'insensitive' }},{type: {contains: 'indica', mode: 'insensitive'}}]
        }
      : {},
    skip: (page_no - 1) * page_size,
    take: page_size,
    orderBy: finalSortArray.length ? finalSortArray : undefined, // Eg:- finalSortArray --> [{title: 'asc'}, {price: 'asc'}]
  });

  if (!(listingData.length > 0)) {
    throw new Error('Listing not found');
  }

  return { listingData, totalCount, totalPages, page_no };
}

// Fetch Product details by ID
export async function fetchDetailsOnIdBasis(id: string) {
  if (!isUUID(id)) {
    throw new Error('Invalid ID format!!');
  }
  const detailsData = await prisma.listingAppSide.findUnique({ where: { id } });

  if (!detailsData) {
    throw new Error('Product not found!!');
  }

  return detailsData;
}

// Fetch Images
const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
});

export async function fetchS3Images() {
  try {
    const bucket = process.env.S3_BUCKET_NAME as string;
    const region = process.env.AWS_REGION as string;

    const command = new ListObjectsV2Command({ Bucket: bucket })
    const response = await s3Client.send(command);

    return response.Contents
        ?.filter((item): item is { Key: string } => !!item.Key)
        .map(
          (item) =>
            `https://${bucket}.s3.${region}.amazonaws.com/${item.Key}`
        ) || []
  
  } catch (error) {
    console.error("S3 error:", error); // Will see AWS error in logs
    throw new Error("Failed to fetch images from S3. Please try again later!");
  }
}