export function compareArrays<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      // @ts-ignore
      if (!compareArrays(a[i], b[i])) return false;
    } else if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
  }
  return true;
}
