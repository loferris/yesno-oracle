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
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #d9e4f5 0%, #f5e3e6 100%);
  padding: 40px 20px;
  box-sizing: border-box;
`;

const InnerDiv = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  background-color: rgba(238, 209, 214, 0.6);
  padding: 48px 32px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  border-radius: 12px;
  border: 2px solid mistyrose;
  height: 52px;
  min-height: 44px;
  width: 100%;
  font-size: 16px;
  outline: none;
  padding: 0 16px;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: white;

  &:focus {
    border-color: #ffc0cb;
    box-shadow: 0 0 0 3px rgba(255, 192, 203, 0.2);
  }

  &:hover {
    border-color: #ffb6c1;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const Label = styled.label`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const CharCounter = styled.span`
  font-size: 13px;
  color: #888;
  font-weight: normal;
`;

const P = styled.p`
  font-size: 100%;
  text-align: center;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Button = styled.button`
  border-radius: 12px;
  outline: none;
  min-height: 44px;
  padding: 14px 32px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  border: 2px solid #ffc0cb;
  font-size: 16px;
  font-weight: 500;
  color: #333;

  &:hover:not(:disabled) {
    background-color: #ffc0cb;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 192, 203, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(255, 192, 203, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    border-color: #ddd;
  }
`;

const Answer = styled.p`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
  color: ${props => (props.answer === "Yes" ? "#4CAF50" : "#f44336")};
  margin: 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoadingText = styled.p`
  font-size: 18px;
  text-align: center;
  font-style: italic;
  color: #666;
  animation: ${fadeIn} 0.3s ease;
  margin: 8px 0;
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
