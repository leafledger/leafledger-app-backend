import { NextFunction, Request, Response } from "express";

import { SignupDto, LoginDto } from "./auth.dto";
import { validate } from "class-validator";
import { signupService, loginService } from "./auth.service";
import { validationErrorHandler } from "../../middleware/errorHandler";
import {
  createdResponse,
  successResponse,
  errorResponse,
} from "../../middleware/responseHandler";

import prisma from "../../config/db";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    if (!token) console.log('You are not logged in!! Please login to get the access!!');
    // 3) verification of the token
    // const decoded = (await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET as string)) as JwtPayload;
    
    const verifyAsync = (token: string, secret: string): Promise<JwtPayload> => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
          if (err || !decoded) return reject(err);
          resolve(decoded as JwtPayload);
        });
      });
    };
    console.log('verifyAsync', verifyAsync.name)

    // usage
    const decoded = await verifyAsync(token || '', process.env.ACCESS_TOKEN_SECRET as string);    
    
    // // 4) check the user is there or not in the Database
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: decoded.email }, { id: decoded.id }] },
    });

    // Grant access on the basis of logged in user
    req["user"] = existingUser;
    next();
};

export async function catalog (req: Request, res: Response) {
  res.json({
        message: `welcome ${req.user?.user_name} to the catalog`
    })
}
