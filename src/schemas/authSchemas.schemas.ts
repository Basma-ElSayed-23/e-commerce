import z, { email, regex } from "zod"


export const LoginSchema = z 
.object({
email: z.email().nonempty("email is required"),
password: z
.string()
.regex(
/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
`password must contain 1 number (0-9)
password must contain 1 uppercase letters 
password must contain 1 lowercase letters 
password must contain 1 non-alpha numeric number 
password is 8-16 characters with no space`,
)
.nonempty("password is required"),
});

export type LoginType = z.infer<typeof LoginSchema>;