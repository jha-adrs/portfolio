import { z } from "zod";
export const formSchema = z.object({
    name: z.string().min(2, {
        message: "That's too short for a name"
    }).max(100, {
        message: "Bro, you've got a veryyy long name!"
    }),
    email: z.string().email({
        message: "Invalid email address, dude you forgot your email address!?"
    }),
    message: z.string().min(10, {
        message: "Don't be shy, tell me more!"

    }).max(1000, {
        message: "That's too long! Let's schedule a meeting instead."
    }),
})