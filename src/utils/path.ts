export const makePath = (parts: string[], stopIndex: number): string => {
  return parts.reduce((path, part, index) => {
    if (index <= stopIndex) {
      return `${path}/${part}`;
    }
    return path;
  }, "");
};

export const normalizePath = (path: string): string => {
  path = path.endsWith("/") ? path.replace(/\/$/, "") : path;
  path = path.startsWith("/") ? path : `/${path}`;
  return path;
};

export const denormalizePath = (path: string): string => {
  return path.replace(/^\//, "");
};

export const parsePath = (
  path: string
): Array<{ path: string; type: string }> => {
  const [, ...parts] = normalizePath(path).split("/");

  if (parts.length === 1 && parts[0] === "") {
    return [];
  }

  return parts.map((_, index) => ({
    path: makePath(parts, index),
    type: index % 2 === 0 ? "collection" : "document"
  }));
};
