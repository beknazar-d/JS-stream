// НДС 20%, который уже входит в цену, в копейках.
export function vatIncluded(amount) {
  return Math.round((amount * 20) / 120);
}
