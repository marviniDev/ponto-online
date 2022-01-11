import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-height: 100%;
  height: inherit;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FlexContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: clip;
`;

export const Main = styled.div`
  width: 100%;
  background-color: var(--cor-bg-body);
`;
