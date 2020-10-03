import React, { useState } from "react";
import styled from "@emotion/styled";

const OracleDiv = styled.div`
  height: 75vh;
  width: 75vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #eed1d6;
`;
const InnerDiv = styled.div`
  height: 25%;
  width: 25%;
  font-size: 150%;
`;

const Input = styled.input`
  border-radius: 15px 30px;
  border-color: mistyrose;
  height: 50px;
  font-size: 100%;
  outline: none;
`;

const Label = styled.label`
  text-align: center;
`;

//const Form = styled.form``;

const P = styled.p`
  font-size: 100%;
  text-align: center;
  overflow-x: auto;
  overlow-y: hidden;
`;

const Button = styled.button`
  border-radius: 15px 30px;
  outline: none;
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
            <Input
              type="text"
              name="question"
              maxLength="45"
              onChange={handleChange}
            />
          </Label>
          <br></br>
          <Button onClick={handleClick}>answer me</Button>
        </form>
        <br></br>
        <P>{question}</P>
        <P>{answer}</P>
      </InnerDiv>
    </OracleDiv>
  );
};

export default Oracle;
