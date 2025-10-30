import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const signupService = async (data: any) => {
    const { user_name, email, name, contact_no, store, province_id, city, vendor_type, address, password } = data;

    // Step: 1 - Check if user already exists
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { user_name }, { contact_no }] },
    });
    if (existingUser) {
        // checking which fields match with the database
        let conflictField = {};
        if (existingUser.email === email) conflictField["field1"] = "email";
        if (existingUser.user_name === user_name) conflictField["field2"] = "user_name";
        if (existingUser.contact_no === contact_no) conflictField["field3"] = "contact_no";

        throw new Error(`User already exists with this ${Object.values(conflictField).join(", ")}`);
    }

    // Step: 2 - Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

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

    return newUser;
}