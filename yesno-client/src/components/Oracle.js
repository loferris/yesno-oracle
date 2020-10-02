import React, { useState } from "react";
import styled from "@emotion/styled";

const OracleDiv = styled.div`
  height: 75vh;
  width: 75vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eed1d6;
`;
const InnerDiv = styled.div`
  height: 25%;
  width: 25%;
  font-size: 150%;
`;

const Input = styled.input`
  border-radius: 15px 50px;
  border-color: mistyrose;
  height: 100px;
  font-size: 150%;
  text-align: center;
`;

const Label = styled.label`
  text-align: center;
`;

const P = styled.p`
  font-size: 150%;
  text-align: center;
`;

const Oracle = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const randomAnswer = () => {
    return Math.random() >= 0.5 ? "Yes" : "No";
  };

  const handleClick = ev => {
    ev.preventDefault();
    setAnswer(randomAnswer());
  };

  const handleChange = ev => {
    ev.preventDefault();
    setQuestion(ev.target.value);
  };

  return (
    <OracleDiv>
      <InnerDiv>
        <form>
          <Label>
            ask a q ^.^
            <br></br>
            <Input type="text" name="question" onChange={handleChange} />
          </Label>
          <br></br>
          <button onClick={handleClick}>answer me</button>
        </form>
        <br></br>
        <P>{answer}</P>
      </InnerDiv>
    </OracleDiv>
  );
};

export default Oracle;
