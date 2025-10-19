import { ZodFormattedError } from "zod";

export function getZodErrorMessages<T>(
  error: ZodFormattedError<T>
): string[] {
  const messages: string[] = [];

  // adiciona mensagens diretas do nível atual
  if (error._errors?.length) {
    messages.push(...error._errors);
  }

  // percorre apenas chaves próprias (exclui toString etc.)
  for (const key of Object.keys(error)) {
    const value = (error as Record<string, unknown>)[key];

    if (value && typeof value === "object" && "_errors" in value) {
      messages.push(...getZodErrorMessages(value as ZodFormattedError<unknown>));
    }
  }

  return messages;
}
