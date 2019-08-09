import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppContext } from "./Context";
import Navbar from "./Navbar";
import { Column, Columns } from "./Columns";
import Collection from "./Collection";
import Document from "./Document";
import RootList from "./Root";

const GlobalStyles = createGlobalStyle`
  body, html {
    padding: 0;
    margin: 0;
    height: 100vh;
  }

  #root {
    height: 100%;
  }

  *:after, *:before, * {
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr;
`;

const makePath = (parts: string[], stopIndex: number): string => {
  const path = parts.reduce((path, part, index) => {
    if (index <= stopIndex) {
      return `${path}/${part}`;
    }
    return path;
  }, "");
  return path.replace(/^\//, "");
};

const sanitizePath = (path: string): string => {
  path = path.endsWith("/") ? path.replace(/\/$/, "") : path;
  path = path.startsWith("/") ? path : `/${path}`;
  return path;
};

const parsePath = (path: string): Array<{ path: string; type: string }> => {
  const [, ...parts] = sanitizePath(path).split("/");

  if (parts.length === 1 && parts[0] === "") {
    return [];
  }

  return parts.map((part, index) => ({
    path: makePath(parts, index),
    type: index % 2 === 0 ? "collection" : "document"
  }));
};

const App: React.FunctionComponent = ({}) => {
  const [path, setPath] = useState("/users/HERO");

  const parts = parsePath(path);
  const onSelectPath = (newPath: string) => setPath(sanitizePath(newPath));

  return (
    <Wrapper>
      <GlobalStyles />
      <AppContext.Provider value={{ path, onSelectPath }}>
        <Navbar />
        <Columns>
          <Column>
            <RootList />
          </Column>
          {parts.map(part => (
            <Column key={part.path}>
              {part.type === "collection" && (
                <Collection path={part.path} />
              )}
              {part.type === "document" && (
                <Document path={part.path} />
              )}
            </Column>
          ))}
        </Columns>
      </AppContext.Provider>
    </Wrapper>
  );
};

export default App;
