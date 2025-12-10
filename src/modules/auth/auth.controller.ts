import { NextFunction, Request, Response } from "express";

import { SignupDto, LoginDto } from "./auth.dto";
import { validate } from "class-validator";
import { signupService, loginService } from "./auth.service";
import { validationErrorHandler } from "../../middleware/errorHandler";
import {
  createdResponse,
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "../../middleware/responseHandler";

import prisma from "../../config/db";
import { config } from "../../config/config";
import { verifyToken } from "../../utils/jwt.util";

export async function signup(req: Request, res: Response) {
  try {
    // Step: 1 -> I - validate request body
    const dto = new SignupDto();
    dto.user_name = req.body.user_name;
    dto.email = req.body.email;
    dto.password = req.body.password;
    dto.contact_no = req.body.contact_no;

    const errors = await validate(dto);

    // Step: 1 -> II - check error exists then structured error fields and update user
    if (errors.length > 0) {
      return validationErrorHandler(errors, res);
    }

    // Step: 2: Business logic(service)
    const result = await signupService(req.body);

    //TODO : Need to make a constants for all messages
    return createdResponse(
      res,
      {
        user: {
          id: result.user.id,
          user_name: result.user.user_name,
          email: result.user.email,
          contact_no: result.user.contact_no,
        },
      },
      "Signup successful"
    );
  } catch (error: any) {
    return errorResponse(res, error.message || "Server error");
  }
}

export async function login(req: Request, res: Response) {
  try {
    // Validate request body
    const dto = new LoginDto();
    dto.email = req.body.email;
    dto.password = req.body.password;

    const errors = await validate(dto);

    // Check if validation errors exist
    if (errors.length > 0) {
      return validationErrorHandler(errors, res);
    }

    // Call service for login logic
    const result = await loginService(dto.email, dto.password);

    return successResponse(
      res,
      {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      },
      result.message
    );
  } catch (error: any) {
    return errorResponse(res, error.message || "Login failed");
  }
}

export async function protect (req: Request, res: Response, next: NextFunction) {
    // 1) Getting token and check if it is there or not
    let token;
    if(req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 

    // 2) check wheather token is there or not, if not then user is not logged in
    if (!token) {
        return unauthorizedResponse(res, "You are not logged in!! Please login to get the access!!");
    }

    try {
        // 3) verification of the token using centralized utility
        const decoded = await verifyToken(token, "access");
       
        // // 4) check the user is there or not in the Database
        const existingUser = await prisma.user.findFirst({
          where: { OR: [{ email: decoded.email }, { id: decoded.id }] },
        });

        if (!existingUser) {
            return unauthorizedResponse(res, "The user belonging to this token no longer exists.");
        }

        // Grant access on the basis of logged in user
        req["user"] = existingUser;
        next();
    } catch (error) {
        return unauthorizedResponse(res, "Invalid token or token expired");
    }
};

