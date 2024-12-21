import React, { useEffect, useRef, useCallback, useReducer } from "react";
import ImgContainer from "./ImgContainer";
import TaskEdit from "./TaskEdit";
import styled, { css } from "styled-components";
import { taskReducer } from "../reducers/taskReducer";
import ModalWindow from "./ModalWindow";

const GeneralStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const StyledTask = styled.li`
    ${GeneralStyles};
    padding: 1.5rem 0.9rem;
    max-width: 23rem;
    border: 0.1rem solid ${({ theme }) => theme.color};
    border-radius: 0.4rem;
    margin-top: 0.4rem;
    min-height: 168px;
    position: relative;
`;

const StyledSerialNumber = styled.span<{ $isChecked: boolean }>`
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color};

    ${({ $isChecked, theme }) => $isChecked && `
      color: ${theme.lineThroughColor};
      text-decoration: line-through;
    `}
`;

const StyledTaskWindow = styled.section`
    ${GeneralStyles};
`;

const HiddenCheckbox = styled.input`
    display: none;
`;

const CheckboxLabel = styled.label`
    position: relative;
    cursor: pointer;
    user-select: none;

    &::before {
        content: '';
        position: absolute;
        left: -0.1rem;
        top: -0.7rem;
        width: 1.3rem;
        height: 1.3rem;
        border: 0.16rem solid ${({ theme }) => theme.color};
        border-radius: 0.3rem;
        background-color: ${({ theme }) => theme.background};
        transition: background-color 0.3s, border-color 0.3s;
    }

    ${HiddenCheckbox}:checked + &::before {
        background-color: ${({ theme }) => theme.color};
        border-color: ${({ theme }) => theme.color};
    }

    ${HiddenCheckbox}:checked + &::after {
        content: '';
        position: absolute;
        left: 0.47rem;
        top: -0.45rem;
        width: 0.4rem;
        height: 0.7rem;
        border: solid ${({ theme }) => theme.background};
        border-width: 0 0.16rem 0.19rem 0;
        transform: rotate(45deg);
    }
`;

interface TaskProps {
  taskName: string;
  onClickDeleteTask: (idTask: number) => void;
  taskIndex: number;
  numberTask: number;
};

const Task = ({ taskName, onClickDeleteTask, taskIndex, numberTask }: TaskProps) => {
  const initialState = {
    isShow: false,
    isEdit: false,
    isChecked: false,
    name: taskName,
    prevName: taskName,
    showModal: false
  };

  const [taskState, dispatch] = useReducer(taskReducer, initialState);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const inputValue = taskState.isEdit || taskState.isShow 
  ? taskState.name 
  : taskState.name.length > 70 
    ? `${taskState.name.slice(0, 71)}...` 
    : taskState.name;

  const handleClickShowMore = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHOW' });
  }, []);

  const handleChangeCheck = useCallback(() => {
    dispatch({ type: 'TOGGLE_CHECK' });
  }, []);

  const handleClickEditTask = () => {
    if(taskState.name.trim().length === 0) {
      dispatch({ type: 'SHOW_MODAL', show: true });
    } else {
      dispatch({ type: 'TOGGLE_EDIT' });

      handleClickShowMore();
    }
  };

  const handleChangeTaskName = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'CHANGE_NAME', data: e.target.value });
  }, []);

  const handleClickCancelEdit = () => {
    dispatch({ type: 'CANCEL_EDIT' });
  };

  const resizeTextarea = () => {
    const textarea = textAreaRef.current;
    
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const hideModalWindow = () => {
    dispatch({ type: 'SHOW_MODAL', show: false });
  }
  
  useEffect(() => {

    if(!taskState.showModal) {
      document.addEventListener('click', hideModalWindow)
    }

    resizeTextarea();

    return () => {
      document.removeEventListener('click', hideModalWindow);
    }
  }, [taskState.name, taskState.isEdit, taskState.showModal]);

  return (
    <StyledTask>
      <StyledSerialNumber $isChecked={taskState.isChecked}>
        {numberTask}
      </StyledSerialNumber>
      <StyledTaskWindow>
        <HiddenCheckbox
          type="checkbox"
          id={`checkbox-${taskIndex}`}
          onChange={handleChangeCheck}
          checked={taskState.isChecked}
          name="isPicked"
          title='Задача выполнена'
          />
        <CheckboxLabel htmlFor={`checkbox-${taskIndex}`}></CheckboxLabel>
        <TaskEdit
          isEdit={taskState.isEdit}
          inputValue={inputValue}
          isChecked={taskState.isChecked}
          onChangeTaskName={handleChangeTaskName}
          textAreaRef={textAreaRef}
          isShow={taskState.isShow}
          onClickShowMore={handleClickShowMore}
          onClickEditTask={handleClickEditTask}
          onClickCancelEdit={handleClickCancelEdit}
          isShowModalWindow={taskState.showModal}
        />
        <ImgContainer 
          onClickEditTask={handleClickEditTask}
          onClickDeleteTask={() => onClickDeleteTask(taskIndex)}
          isEdit={taskState.isEdit}
        />
      </StyledTaskWindow>

      {taskState.showModal && 
      <ModalWindow
        taskIndex={taskIndex}
        onClickDeleteTask={() => onClickDeleteTask(taskIndex)}
        onClickCloseModalWindow={hideModalWindow}
      />}
    </StyledTask>
  );
};

export default Task;