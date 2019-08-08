import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppContext } from "./Context";
import Navbar from "./Navbar";
import { Column, Columns } from "./Columns";

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

const parsePath = (path: string): Array<{ path: string; type: string }> => {
  path = path.endsWith("/") ? path.replace(/\/$/, "") : path;
  path = path.startsWith("/") ? path : `/${path}`;
  const [, ...parts] = path.split("/");

  if (parts.length === 1 && parts[0] === "") {
    return [];
  }

  return parts.map((part, index) => ({
    path: makePath(parts, index),
    type: index % 2 === 0 ? "collection" : "document"
  }));
};

const App: React.FunctionComponent = ({}) => {
  const [path, setPath] = useState("/users/id/collection/someid");

  const parts = parsePath(path);

  return (
    <Wrapper>
      <GlobalStyles />
      <AppContext.Provider value={{ path }}>
        <Navbar onChangePath={setPath} path={path} />
        <Columns>
          <Column>Root</Column>
          {parts.map(part => (
            <Column key={part.path}>
              {part.type}
              <br />
              {part.path}
            </Column>
          ))}
        </Columns>
      </AppContext.Provider>
    </Wrapper>
  );
};

export default App;
