import { IsEmail, IsPhoneNumber, Length } from "class-validator";

export class SignupDto {
  @Length(3, 20, { message: "user_name must be 3-20 characters"})
  user_name: string;

  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @Length(6, 20, { message: "Password must be 6–20 characters" })
  password: string;

  @IsPhoneNumber("IN", { message: "Invalid phone number" })
  contact_no: string;
}


export class LoginDto {
  // Step 1 - Validate Email
  @IsEmail({}, { message: "Invalid email format. Please check your entered mail!!" })
  email: string;

  // Step 1 - Validate Password length
  @Length(6, 20, { message: "Password must be 6–20 characters" })
  password: string;
}