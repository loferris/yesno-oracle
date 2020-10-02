import React from "react";
import "./App.css";
import styled from "@emotion/styled";
import Oracle from "./components/Oracle";

const AppDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9e4f5;
  background-image: linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%);
`;

const App = () => {
  return (
    <AppDiv className="App">
      <Oracle />
    </AppDiv>
  );
};

export default App;
