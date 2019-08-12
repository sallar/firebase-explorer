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
): Array<{
  key: string;
  path: string;
  type: string;
  currentId: string | null;
}> => {
  const [, ...parts] = normalizePath(path).split("/");
  const homePart = {
    key: "/",
    path: "/",
    currentId: parts.length > 0 ? parts[0] : null,
    type: "root"
  };

  if (parts.length === 1 && parts[0] === "") {
    return [homePart];
  }

  const mainParts = parts.map((key, index) => ({
    key,
    path: makePath(parts, index),
    currentId: parts.length >= index ? parts[index + 1] : null,
    type: index % 2 === 0 ? "collection" : "document"
  }));

  return [homePart, ...mainParts];
};
