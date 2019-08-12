import React from "react";
import styled from "styled-components";

export const ColumnsWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(0);
  transition: transform 200ms ease;
`;

export const Columns: React.FunctionComponent = ({ children }) => {
  const count = React.Children.count(children);

  const extraCount = count > 3 ? count - 3 : 0;
  const translate = `-${extraCount * 27}vw`;

  return (
    <ColumnsWrapper>
      <ColumnsContainer style={{ transform: `translateX(${translate})` }}>
        {children}
      </ColumnsContainer>
    </ColumnsWrapper>
  );
};

export const Column = styled.div`
  border-right: 1px solid red;
  flex: 0 0 27vw;
  overflow-y: auto;
  transition: flex-basis 200ms ease;

  &:nth-child(2),
  &:nth-child(1) {
    flex-basis: 27vw !important;
  }

  &:last-of-type {
    flex-basis: 46vw;
  }
`;
