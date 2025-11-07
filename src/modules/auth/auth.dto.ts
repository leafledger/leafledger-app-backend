import {
  IsEmail,
  IsPhoneNumber,
  Length,
  IsOptional,
  IsString,
  IsIn,
  Matches,
} from "class-validator";

export class SignupDto {
  @Length(3, 50, { message: "user_name must be 3-50 characters" })
  @Matches(/^[A-Za-z0-9._]+$/, {
    message: "user_name can only contain letters, numbers, dot, and underscore (no spaces or special characters)",
  })
  user_name: string;

  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @Length(6, 128, { message: "Password must be at least 6 characters" })
  password: string;

  @IsPhoneNumber("IN", { message: "Invalid phone number" })
  contact_no: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  store?: string;

  @IsOptional()
  @IsString()
  province_id?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  @IsIn(["vendor", "customer", "admin"], {
    message: "vendor_type must be vendor, customer, or admin",
  })
  vendor_type?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export class LoginDto {
  @IsEmail({}, { message: "Invalid email format. Please check your entered mail!!" })
  email: string;

  @Length(6, 128, { message: "Password must be at least 6 characters" })
  password: string;
}
