export const rem = (
  sizeInPx: number,
  withUnit: boolean = true,
  baseSize: number = 16,
) => (sizeInPx / baseSize).toString().concat(!withUnit ? '' : 'rem');

export default { rem };
