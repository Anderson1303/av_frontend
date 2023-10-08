import { toPattern } from 'vanilla-masker';

export const formatMask = (value: string, mask: string | string[]) => {
  const origin = value?.toString()?.replace(/\W/g, '') ?? "";

  return toPattern(origin, {
    pattern: typeof mask === "string" ? mask : mask.reduce((previous, current) => (
      origin.length <= previous.replace(/\W/g, '').length ? previous : current
    ), mask[0])
  });
}