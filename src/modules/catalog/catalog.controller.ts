import { Request, Response } from "express";

import { catalogDataHandling, fetchDetailsOnIdBasis } from "./catalog.service";
import { successResponse, errorResponse, notFoundResponse } from "../../middleware/responseHandler";
import { validate } from "class-validator";
import { CatalogDto } from "./catalog.dto";
import { validationErrorHandler } from "../../middleware/errorHandler";

// For Catalog Listing
export async function catalog(req: Request, res: Response) {
    try {
        // 1. Validate query string
        const dto = new CatalogDto();
        dto.sort = req.query.sort as string;
        dto.page_no = Number(req.query.page_no) || undefined;
        dto.page_size = Number(req.query.page_size) || undefined;
        dto.filter = req.query.filter as string;
        
        // 2. Any error at validation time then update the user
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            return validationErrorHandler(errors, res);
        }

        // 3. Business logic
        const { listingData, totalCount, totalPages, page_no } = await catalogDataHandling(req.query);

        // 4. Success response
        successResponse(res, {
            totalCount,
            totalPages,
            currentPageCount: listingData.length,
            currentPage: page_no,
            listingData,
        }, `welcome ${req.user?.user_name} to the catalog`)
    } catch (error: any) {
        if (error.message === "Listing not found") {
            return notFoundResponse(res, "No Results Match!!");
        }
        return errorResponse(res, error.message || "Something went wrong while fetching data. Please try again later");
    }
}

// For Details Page
export async function getCatalogDetails(req: Request, res: Response) {
    try {
        const detailsData = await fetchDetailsOnIdBasis(req.params.id);

        successResponse(res, detailsData, 'This is the details page')

    } catch (error: any) {
        if (error.message === "Product not found!!") {
            return notFoundResponse(res, "Product not found!!");
        }
        return errorResponse(res, error.message || "Something went wrong while fetching data. Please try again later");
    }
}