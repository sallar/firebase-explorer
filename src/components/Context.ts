import { createContext } from "react";

interface AppContext {
  path: string;
  onSelectPath(path: string): unknown;
}

export const AppContext = createContext<AppContext>({
  path: "/",
  onSelectPath: () => {}
});
