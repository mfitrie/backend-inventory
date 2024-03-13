/* eslint-disable prettier/prettier */
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const UserSignInSchema = z.object({
    email: z.string(),
    password: z.string()
});

export class UserSignInDTO extends createZodDto(UserSignInSchema){}