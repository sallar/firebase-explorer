import "typeface-roboto";
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppContext } from "./Context";
import Navbar from "./Navbar";
import { Column, Columns } from "./Columns";
import DataContainer from "./DataContainer";
import { parsePath, normalizePath } from "../utils/path";

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

const App: React.FunctionComponent = ({}) => {
  const [path, setPath] = useState("/users/HERO");

  const parts = parsePath(path);
  const onSelectPath = (newPath: string) => setPath(normalizePath(newPath));

  return (
    <Wrapper>
      <GlobalStyles />
      <AppContext.Provider value={{ path, onSelectPath }}>
        <Navbar />
        <Columns>
          {parts.map(part => (
            <Column key={part.path}>
              <DataContainer
                path={part.path}
                type={part.type}
                currentId={part.currentId}
              />
            </Column>
          ))}
        </Columns>
      </AppContext.Provider>
    </Wrapper>
  );
};

export default App;
