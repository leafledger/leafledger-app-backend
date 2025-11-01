import { Request, Response } from "express";

import { SignupDto, LoginDto } from "./auth.dto";
import { validate } from "class-validator";
import { signupService, loginService } from "./auth.service";
import { validationErrorHandler } from "../../middleware/errorHandler";
import {
  successResponse,
  errorResponse,
} from "../../middleware/responseHandler";

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
    res.status(201).json(
      successResponse(
        {
          token: result.token,
          user: {
            id: result.user.id,
            user_name: result.user.user_name,
            email: result.user.email,
            contact_no: result.user.contact_no,
          },
        },
        "Signup successful"
      )
    );
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message || "Server error"));
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

    res.status(200).json(
      successResponse(
        {
          token: result.token,
          user: result.user,
        },
        result.message
      )
    );
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message || "Login failed"));
  }
}
