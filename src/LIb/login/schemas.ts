import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" }),

  password: z
    .string()
    .trim()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});
