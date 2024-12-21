import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-1.5rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const MainStylesButton = css`
    transition: all 0.3s linear;
    border: 0.1rem solid ${({ theme }) => theme.color};
    font-size: 1rem;
`;

const StyledWrapper = styled.section`
    animation: ${fadeIn} 0.2s linear;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 1rem;
    left: 3.5rem;
    width: 14rem;
    height: 7.3rem;
    background: ${({ theme }) => theme.background};
    border-radius: 0.24rem;
`;

const DeleteButton = styled.button`
    ${MainStylesButton}
    animation: ${fadeIn} 0.4s linear;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    border-radius: 0.5rem;
    width: 8rem;
    height: 3rem;

    &:hover {
      border-radius: 0.2rem;
    }
`;

const CloseButton = styled.button`
    ${MainStylesButton}
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    width: 1.5rem;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    border-radius: 0.2rem;

    &:hover {
      border-radius: 0rem;
    }
`;

interface ModalWindowProps {
  onClickDeleteTask: (idTask: number) => void;
  onClickCloseModalWindow: () => void;
  taskIndex: number;
};

const ModalWindow = ({ onClickDeleteTask, onClickCloseModalWindow, taskIndex }: ModalWindowProps) => {
  return (
       <StyledWrapper>
            <DeleteButton onClick={() => onClickDeleteTask(taskIndex)}>
                Удалить?
            </DeleteButton>
            <CloseButton onClick={onClickCloseModalWindow}>
                X
            </CloseButton>
       </StyledWrapper>
    );
};

export default ModalWindow;