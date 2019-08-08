import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  height: 40px;
  width: 100%;
  display: block;
  border: 1px solid red;
  border-radius: 5px;
`;

interface NavbarProps {
  path: string;
  onChangePath(path: string): any;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  path,
  onChangePath
}) => {
  const [currentPath, setCurrentPath] = useState(path);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPath(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChangePath(currentPath);
    }
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
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
