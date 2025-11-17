import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OracleDiv = styled.div`
  height: 75vh;
  width: 75vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eed1d6;
  padding: 20px;
  box-sizing: border-box;
`;

const InnerDiv = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Input = styled.input`
  border-radius: 15px 30px;
  border: 2px solid mistyrose;
  height: 50px;
  min-height: 44px;
  width: 100%;
  max-width: 400px;
  font-size: 100%;
  outline: none;
  padding: 0 12px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #ffc0cb;
    box-shadow: 0 0 8px rgba(255, 192, 203, 0.5);
  }

  &:hover {
    border-color: #ffb6c1;
  }
`;

const Label = styled.label`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  font-size: 150%;
`;

const CharCounter = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: -8px;
`;

const P = styled.p`
  font-size: 100%;
  text-align: center;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Button = styled.button`
  border-radius: 15px 30px;
  outline: none;
  min-height: 44px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  border: 2px solid #ddd;

  &:hover:not(:disabled) {
    background-color: #fff0f5;
    border-color: #ffc0cb;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Answer = styled.p`
  font-size: 200%;
  font-weight: bold;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
  color: ${props => (props.answer === "Yes" ? "#4CAF50" : "#f44336")};
  margin-top: 20px;
`;

const LoadingText = styled.p`
  font-size: 120%;
  text-align: center;
  font-style: italic;
  color: #999;
  animation: ${fadeIn} 0.3s ease;
`;

const Oracle = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const randomAnswer = () => {
    return Math.random() >= 0.5 ? "Yes" : "No";
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    if (question.trim()) {
      setIsLoading(true);
      setAnswer("");

      // Brief delay for mystical effect
      setTimeout(() => {
        setAnswer(randomAnswer());
        setIsLoading(false);

        // Clear input and refocus for next question
        setQuestion("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 800);
    }
  };

  const handleChange = ev => {
    setQuestion(ev.target.value);
  };

  const handleKeyPress = ev => {
    if (ev.key === "Enter") {
      handleSubmit(ev);
    }
  };

  return (
    <OracleDiv>
      <InnerDiv>
        <FormContainer onSubmit={handleSubmit}>
          <Label>
            ask a q ^.^
            <Input
              ref={inputRef}
              type="text"
              name="question"
              maxLength="45"
              value={question}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              aria-label="Ask your question"
              placeholder="Type your question..."
            />
            <CharCounter>{question.length}/45</CharCounter>
          </Label>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!question.trim()}
            aria-label="Get your answer"
          >
            answer me
          </Button>
        </FormContainer>
        {question && !isLoading && !answer && <P>{question}</P>}
        {isLoading && <LoadingText>consulting the oracle...</LoadingText>}
        {answer && <Answer answer={answer}>{answer}</Answer>}
      </InnerDiv>
    </OracleDiv>
  );
};

export default Oracle;
