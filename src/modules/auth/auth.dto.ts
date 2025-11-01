import {
  IsEmail,
  IsPhoneNumber,
  Length,
  IsOptional,
  IsString,
  IsIn,
} from "class-validator";

export class SignupDto {
  @Length(3, 20, { message: "user_name must be 3-20 characters" })
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
