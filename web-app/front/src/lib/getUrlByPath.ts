export function getUrlByPath(path?: string) {
  const baseUrl = process.env.NEXTAUTH_URL ?? "";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path ?? "";
  return new URL(`${baseUrl}${normalizedPath}`);
}
