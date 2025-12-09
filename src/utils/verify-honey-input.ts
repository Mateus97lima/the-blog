import { asyncDelay } from "./async-delay";

export async function VerifyHoneyInput(formData: FormData, delay = 3000) {
  await asyncDelay(delay);

  const niceInputValue = formData.get('dateUpdatedAt');

  console.log(formData);

  const isBot =
    niceInputValue === null || // campo não enviado //
    (typeof niceInputValue === 'string' && niceInputValue.trim() !== '');

  return isBot;
}
