import React from "react";
import styled, { css, keyframes } from "styled-components";

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledWrapper = styled.section`
  ${FlexCenter};
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  flex-direction: row;
  box-shadow: 0 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.06);
`;

const StyledForm = styled.form`
  ${FlexCenter};
  margin-top: 2rem;
  margin-bottom: 0.8rem;
`;

const StyledTitle = styled.h1`
  position: absolute;
  top: 1rem;
  left: 7.5rem;
  color: ${({ theme }) => theme.color};
  font-size: 1.8rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledText = styled.p`
  color: ${({ theme }) => theme.color};
  animation: ${fadeIn} 0.4s linear;
  margin-top: 1rem;
  font-size: 1.04rem;
`;

const addTaskAnimation = keyframes`
    0% {
        box-shadow: 0 0 0 transparent;
        opacity: 0.8;
    }
    50% {
        box-shadow: 0 0 1rem gray;
        opacity: 1;
    }
    100% {
        box-shadow: 0 0 0 transparent;
        opacity: 0.8;
    }
`;

const StyledButton = styled.button<{ $isTaskAdded: boolean }>`
    background: ${({ theme }) => theme.background};
    transition: all 0.3s linear;
    border: 0.1rem solid ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.color};
    width: 19rem;
    height: 2.7rem;
    font-size: 1rem;
    letter-spacing: 0.01rem;
    border-radius: 0.5rem;

    ${({ $isTaskAdded }) => $isTaskAdded && css`
      animation: ${addTaskAnimation} 1s ease-in-out;
    `}

    &:hover {
      background: ${({ theme }) => theme.color};
      color: ${({ theme }) => theme.background};
    }
`;

const StyledInput = styled.input`
    width: 19rem;
    height: 2.7rem;
    border-top-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 0.12rem solid ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    padding: 0.7rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    transition: 0.3s linear;

    &::placeholder {
      color: ${({ theme }) => theme.color};
    }

    &:focus {
      border-bottom-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      border-top-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
`;

const StyledThemeSection = styled.section`
  ${FlexCenter};
  margin-left: 1rem;
  height: 11.9rem;
`;

const StyledDivBackground = styled.div`
  ${FlexCenter};
  justify-content: normal;
  padding: 0.4rem;
  width: 2rem;
  height: 4rem;
  border: 0.15rem solid ${({ theme }) => theme.color};
  border-radius: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const StyledDivDot = styled.div`
  width: 1rem;
  height: 1rem;
  background: ${({ theme }) => theme.color};
  border-radius: 50%;
  transform: ${({ theme }) => (theme.isDarkTheme ? 'translateY(1.9rem)' : '')};
  transition: 0.25s all linear;
`;

const StyledSvgContainer = styled.div`
  ${FlexCenter}
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.color};
`;

interface FormInputProps {
  handleChangeNameTask: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameTaskValue: string;
  handleClickAddTask: () => void;
  isTaskNameEmpty: boolean | null;
  isTaskAdded: boolean;
  handleChangeTheme: () => void;
}

const FormInput = ({
  handleChangeNameTask, 
  nameTaskValue,
  handleClickAddTask,
  isTaskNameEmpty,
  isTaskAdded,
  handleChangeTheme
}: FormInputProps) => {
  return (
    <StyledWrapper>
        <StyledTitle>
        Todo List
        </StyledTitle>
      <div>
          <StyledForm
            name="addTaskForm" 
            onSubmit={(e) => {e.preventDefault()}}
          >
          <StyledInput
            type='text'
            name="addTaskInput"  
            placeholder="Запиши, чтобы не забыть"
            onChange={handleChangeNameTask}
            value={nameTaskValue}
            tabIndex={1}
            title='Напишите, чем хотели бы заняться'
          />
          <StyledButton
            onClick={handleClickAddTask}
            $isTaskAdded={isTaskAdded}
            title='Добавить задачу'
          >
            Добавить
          </StyledButton>
            {isTaskNameEmpty && <StyledText>Введите название задачи</StyledText>}
          </StyledForm>
      </div>
      <StyledThemeSection>
        <StyledSvgContainer>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.006 22.006" fill="currentColor" aria-label="светлая тема">
            <g>
              <path d="M4.63,6.045c0.394,0.393,1.028,0.399,1.421,0.006c0.39-0.39,0.393-1.021-0.007-1.421l-1.4-1.4
                C4.249,2.835,3.617,2.829,3.223,3.223c-0.391,0.39-0.394,1.02,0.007,1.421L4.63,6.045z"/>
              <path d="M20.997,10.003h-1.98c-0.559,0-1.011,0.444-1.011,1c0,0.553,0.443,1,1.011,1h1.98c0.559,0,1.009-0.443,1.009-1
                C22.006,10.451,21.562,10.003,20.997,10.003z"/>
              <path d="M4,11.003c0-0.552-0.444-1-1.01-1H1.009c-0.558,0-1.009,0.444-1.009,1c0,0.553,0.443,1,1.009,1H2.99
                C3.548,12.003,4,11.56,4,11.003z"/>
              <path d="M11.003,5c-3.313,0-6,2.687-6,6s2.687,6,6,6c3.312,0,6-2.687,6-6S14.315,5,11.003,5z M11.003,15c-2.209,0-4-1.791-4-4
                s1.791-4,4-4s4,1.791,4,4S13.212,15,11.003,15z"/>
              <path d="M4.63,15.962l-1.4,1.4c-0.395,0.395-0.401,1.027-0.007,1.421c0.391,0.39,1.021,0.393,1.421-0.007l1.4-1.4
                c0.395-0.395,0.401-1.027,0.007-1.421C5.66,15.563,5.03,15.562,4.63,15.962z"/>
              <path d="M17.376,6.045l1.4-1.401c0.395-0.395,0.399-1.027,0.007-1.421c-0.392-0.39-1.021-0.393-1.421,0.007l-1.4,1.4
                c-0.395,0.395-0.4,1.028-0.007,1.421C16.347,6.441,16.976,6.444,17.376,6.045z"/>
              <path d="M11.003,18.006c-0.553,0-1,0.444-1,1.011v1.98c0,0.559,0.444,1.009,1,1.009c0.553,0,1-0.442,1-1.009v-1.98
                C12.003,18.458,11.56,18.006,11.003,18.006z"/>
              <path d="M17.376,15.962c-0.395-0.395-1.027-0.4-1.421-0.007c-0.39,0.392-0.394,1.021,0.007,1.421l1.4,1.4
                c0.395,0.395,1.027,0.399,1.421,0.007c0.391-0.39,0.394-1.021-0.007-1.421L17.376,15.962z"/>
              <path d="M11.003,4c0.553,0,1-0.443,1-1.01V1.01c0-0.558-0.443-1.01-1-1.01c-0.553,0-1,0.444-1,1.01v1.98
                C10.003,3.548,10.447,4,11.003,4z"/>
            </g>
          </svg>
        </StyledSvgContainer>
          <StyledDivBackground onClick={handleChangeTheme}>
            <StyledDivDot></StyledDivDot>
          </StyledDivBackground>
        <StyledSvgContainer>
          <svg xmlns="http://www.w3.org/2000/svg" width='1.7rem' height='1.7rem' viewBox="0 0 210.53 203.59" fill="currentColor" aria-label="темная тема">
            <path 
              d="M50.38,14.91h0m-.51.42A107.51,107.51,0,0,0,45.64,50.4C48.08,106.48,94,151.53,150.12,153c.92,0,1.86,0,2.78,0a106.56,106.56,0,0,0,42.41-8.71,98,98,0,0,1-82.1,44.31c-53.38,0-97.43-43.4-98.2-96.74A97.89,97.89,0,0,1,49.87,15.33M196,144h0M50,0a14.45,14.45,0,0,0-9.35,3.5A113,113,0,0,0,0,92.06c.9,61.6,51.59,111.53,113.2,111.53h0A113.13,113.13,0,0,0,208,152.26c6.85-10.47-1.32-23.24-12.21-23.24a14.92,14.92,0,0,0-6,1.29A92,92,0,0,1,152.9,138l-2.4,0c-48.24-1.23-87.78-40-89.88-88.22a92.51,92.51,0,0,1,3.73-30.48C67.46,8.81,59.1,0,50,0Z" 
              fill="currentColor" 
            />
          </svg>
        </StyledSvgContainer>
      </StyledThemeSection>
    </StyledWrapper>
  )
};

export default FormInput;