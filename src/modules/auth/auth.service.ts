import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import prisma from "../../config/db";
import { config } from "../../config/config";
import { validatePasswordComplexity } from "../../utils/password.util";
import { sanitizeUserInput } from "../../utils/inputSanitizer";
import { generateTokens } from "../../utils/jwt.util";

export async function signupService(data: any) {
  // Sanitize input data first
  const sanitizedData = sanitizeUserInput(data);
  
  const {
    user_name,
    email,
    name,
    contact_no,
    store,
    province_id,
    city,
    vendor_type,
    address,
    password,
  } = sanitizedData;

  // Step: 1 - Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { user_name }, { contact_no }] },
  });
  if (existingUser) {
    // checking which fields match with the database
    const conflictFields = [];
    if (existingUser.email === email) conflictFields.push("email");
    if (existingUser.user_name === user_name) conflictFields.push("user_name");
    if (existingUser.contact_no === contact_no) conflictFields.push("contact_no");

    throw new Error(
      `User already exists with this ${conflictFields.join(", ")}`
    );
  }

  // Step: 1.5 - Validate password complexity
  const passwordValidation = validatePasswordComplexity(password);
  if (!passwordValidation.isValid) {
    throw new Error(passwordValidation.message || "Password does not meet complexity requirements");
  }

  // Step: 2 - Hashing password
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);

  // Step: 3 - Create new user
  const newUser = await prisma.user.create({
    data: {
      user_name,
      email,
      name,
      contact_no,
      store,
      province_id,
      city,
      vendor_type,
      address,
      password: hashedPassword,
    },
  });

  return { user: newUser };
}

export async function loginService(email: string, password: string) {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Step: 4 - Generate JWT token
  const { accessToken, refreshToken } = generateTokens(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      user_name: user.user_name,
      email: user.email,
      contact_no: user.contact_no,
      name: user.name,
    },
    message: "Login successful",
  };
}