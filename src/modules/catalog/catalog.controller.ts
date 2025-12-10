import { Request, Response } from "express";

import { CatalogDataHandling, fetchDetailsOnIdBasis } from "./catalog.service";
import { successResponse, errorResponse, notFoundResponse } from "../../middleware/responseHandler";

// For Catalog Listing
export async function catalog(req: Request, res: Response) {
    try {
        const { listingData, totalCount } = await CatalogDataHandling(req.query);

        if (!listingData.length) {
            return notFoundResponse(res, "No Record found!!");
        }

        successResponse(res, {
            totalCount,
            currentPageCount: listingData.length,
            listingData,
        }, `welcome ${req.user?.user_name} to the catalog`)
    } catch (error: any) {
        return errorResponse(res, error.message || "Something went wrong while fetching data. Please try again later");
    }
}

// For Details Page
export async function getCatalogDetails(req: Request, res: Response) {
    try {
        const listingDetails = await fetchDetailsOnIdBasis(req.params.id);

        if (!listingDetails) {
            return notFoundResponse(res, "No Product found!!");
        }

        successResponse(res, listingDetails, 'This is the details page')

    } catch (error: any) {
        return errorResponse(res, error.message || "Something went wrong while fetching data. Please try again later");
    }
}