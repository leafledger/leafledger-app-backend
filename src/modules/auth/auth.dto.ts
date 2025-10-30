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
