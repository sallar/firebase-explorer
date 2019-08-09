import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./Context";

const Input = styled.input`
  height: 40px;
  width: 100%;
  display: block;
  border: 1px solid red;
  border-radius: 5px;
`;


const Navbar: React.FunctionComponent = () => {
  const { onSelectPath, path } = useContext(AppContext);
  const [currentPath, setCurrentPath] = useState(path);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPath(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSelectPath(currentPath);
    }
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  useEffect(() => {
    if (path !== currentPath) {
      setCurrentPath(path);
    }
  }, [path]);

  return (
    <Input
      type="text"
      onChange={onChange}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      value={currentPath}
    />
  );
};

export default Navbar;
