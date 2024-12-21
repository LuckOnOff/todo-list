import React from 'react';
import TaskEditButtons from './TaskEditButtons';
import styled, { css } from 'styled-components';

const FlexColumnCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledTaskEditContainer = styled.div`
  ${FlexColumnCenter};
  height: 100%;
`;

const StyledTextArea = styled.textarea<IsCheckedType>`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  min-height: 6rem;
  height: 100%;
  border: 0.1rem solid ${({ theme }) => theme.color};
  padding: 0.3rem;
  border-radius: 7px;
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  max-width: 13rem;
  width: 100%;
  margin: 0 0.5rem 0 1rem;
  transition: all 0.2s linear;

  ${({ $isChecked, theme }) => $isChecked && `
      text-decoration: line-through;
      color: ${theme.lineThroughColor};
  `}
`;

const StyledButton = styled.button`
  background: ${({ theme }) => theme.background};
  transition: all 0.3s linear;
  border: 0.1rem solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  border-radius: 0.5rem;
  width: 10rem;
  height: 2rem;
  margin: 1rem 0.1rem 0 0;
  font-size: 0.9rem;

  &:hover {
    border-radius: 0.2rem;
  }
`;

const StyledText = styled.p<IsCheckedType>`
  color: ${({ theme }) => theme.color};
  font-size: 1.1rem;
  overflow-wrap: break-word;
  max-width: 12rem;
  width: 100%;
  height: auto;
  background-color: transparent;
  transition: all 0.2s linear;

  ${({ $isChecked, theme }) => $isChecked && `
      text-decoration: line-through;
      color: ${theme.lineThroughColor};
  `}
`;

const StyledContainer = styled.div`
  ${FlexColumnCenter};
  margin: 0 0.5rem 0 1rem;
`;

type IsCheckedType = { $isChecked: boolean };

interface TaskEditProps {
  isEdit: boolean;
  inputValue:  string;
  isChecked: boolean;
  onChangeTaskName: React.ChangeEventHandler<HTMLTextAreaElement>;
  textAreaRef:  React.RefObject<HTMLTextAreaElement | null>;
  isShow: boolean;
  onClickShowMore:  () => void;
  onClickEditTask:  () => void;
  onClickCancelEdit:  () => void;
  isShowModalWindow: boolean;
};

const TaskEdit = ({ 
  isEdit,
  inputValue,
  isChecked,
  onChangeTaskName,
  textAreaRef,
  isShow,
  onClickShowMore,
  onClickEditTask,
  onClickCancelEdit,
  isShowModalWindow
}: TaskEditProps) => (
  isEdit ? (
    <StyledTaskEditContainer>
      <StyledTextArea 
        $isChecked={isChecked} 
        ref={textAreaRef}
        value={inputValue}
        onChange={onChangeTaskName}
        disabled={isShowModalWindow}
        tabIndex={2}
        name="taskArea"
      />
      <TaskEditButtons 
        onSave={() => { onClickShowMore(); onClickEditTask(); }}
        onCancel={() => {onClickCancelEdit()}}
      />
    </StyledTaskEditContainer>
  ) : (
    <StyledContainer>
      <StyledText $isChecked={isChecked}>
        {inputValue}
      </StyledText>
      {inputValue.length > 70 && 
      <StyledButton 
        onClick={onClickShowMore}
      >
        {isShow ? 'Скрыть' : 'Показать больше'}
      </StyledButton>}
    </StyledContainer>
  )
);

export default TaskEdit;