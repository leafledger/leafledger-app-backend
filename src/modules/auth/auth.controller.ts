import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { SignupDto } from "./auth.dto";
import { validate } from "class-validator";
import { signupService } from "./auth.service";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
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
      const formattedErrors = errors.map(e=>({field: e.property, message: Object.values(e.constraints)[0]}));
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors
      });
    }

    // Step: 2: Business logic(service)
    const newUser = await signupService(req.body);

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Server error" });
  }
};
