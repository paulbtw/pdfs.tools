export function compareArrays<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!compareArrays(a[i] as any, b[i] as any)) return false;
    } else if (a[i] !== b[i]) return false;
  }
  return true;
}
