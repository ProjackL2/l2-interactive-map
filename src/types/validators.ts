import { nanoid } from "nanoid";
import { z } from "zod";

export const PinValidator = z.object({
    id: z.string().default(() => nanoid()),
    iconUrl: z.string(),
    title: z.string(),
    imageUrl: z.string().optional(),
    description: z.string(),
    area: z.enum(["High Five"]),
    x: z.number(),
    y: z.number(),
    z: z.number(),
    typeId: z.string().nullable(),
    status: z.enum(["private", "public"]).default("private"),
});

export type PinOutput = z.output<typeof PinValidator>;