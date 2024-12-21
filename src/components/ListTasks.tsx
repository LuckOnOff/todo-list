import Task from "./Task";
import styled from "styled-components";

const StyledListTasks = styled.ul<{ $dataTask: TaskData[] }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: ${({ $dataTask }) => $dataTask.length < 2 ? 'auto' : '91%'};
  min-width: 24rem;
  height: auto;
  border-radius: 0.5rem;
  gap: 1.5rem;
  padding: ${({ $dataTask }) => $dataTask.length > 0 ? '1rem' : '0rem'};
  margin-top: 1rem; 
  box-shadow: ${({ $dataTask }) => $dataTask.length > 0 ? 
  `0 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1),
   0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.06);
  `
  : ''};
`;

interface TaskData {
  id: number;
  taskName: string;
};

interface ListTasksProps {
  dataTask: TaskData[];
  onClickDeleteTask: (idTask: number) => void;
};

const ListTasks = ({ dataTask, onClickDeleteTask }: ListTasksProps) => {
  return (
    <StyledListTasks $dataTask={dataTask}>
      {dataTask.map((item, index) => (
        <Task 
          key={item.id} 
          taskName={item.taskName}
          taskIndex={item.id}
          numberTask={index + 1}
          onClickDeleteTask={onClickDeleteTask}
        />
      ))}
    </StyledListTasks>
  );
};

export default ListTasks;