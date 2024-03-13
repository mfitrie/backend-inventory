/* eslint-disable prettier/prettier */
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    quantity: z.number(),
    imagelink: z.string(),
});

export class ProductDTO extends createZodDto(ProductSchema){}