import React, { JSX, useState } from "react";
import FormInput from "./FormInput";
import ListTasks from "./ListTasks";
import styled from "styled-components";

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

interface Task {
  id: number;
  taskName: string;
};

interface DisplayProps {
  onToggleTheme: () => void;
}

const Display = ({ onToggleTheme }: DisplayProps): JSX.Element => {
  const [dataTask, setDataTask] = useState<Task[]>([]);
  const [nameTaskValue, setNameTaskValue] = useState<string>('');
  const [isTaskNameEmpty, setIsTaskNameEmpty] = useState<null | boolean>(null);
  const [isTaskAdded, setIsTaskAdded] = useState<boolean>(false);

  const handleClickAddTask = () => {
    if(nameTaskValue.trim().length === 0) {
      setIsTaskNameEmpty(true);
      setIsTaskAdded(false);

      return;
    };

    setDataTask(
      [
        ...dataTask,
        {'id': Date.now(), 'taskName': nameTaskValue}
      ]
    );

    setTimeout(() => {
      setIsTaskAdded(true);
    }, 0);
    setIsTaskNameEmpty(false);
    clearNameTaskValue();
  };
  
  const handleChangeNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameTaskValue(e.target.value);
  };

  const clearNameTaskValue = () => {
    setNameTaskValue('');
    setIsTaskAdded(false);
  };

  const handleClickDeleteTask = (idTask: number) => {
    const filteredDataTask = dataTask.filter(item => item.id !== idTask);

    setDataTask(filteredDataTask);
  };

  return (
    <StyledArticle>
      <FormInput 
        handleChangeNameTask={handleChangeNameTask}
        nameTaskValue={nameTaskValue}
        handleClickAddTask={handleClickAddTask}
        isTaskNameEmpty={isTaskNameEmpty}
        isTaskAdded={isTaskAdded}
        handleChangeTheme={onToggleTheme}
      />
      <ListTasks 
        dataTask={dataTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    </StyledArticle>
  );
};

export default Display;