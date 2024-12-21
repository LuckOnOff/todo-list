import styled from "styled-components";

const StyledButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
`;

const StyledButton = styled.button<{ $saveEdit?: boolean }>`
    background: ${({ theme }) => theme.background};
    transition: all 0.3s linear;
    border: 0.1rem solid ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.color};
    border-radius: 0.5rem;
    width: 8rem;
    height: 2rem;
    font-size: 1rem;

    &:hover {
      border-radius: 0.2rem;
    }

    ${({ $saveEdit }) => $saveEdit && `
        margin-right: 1.3rem;
    `}
`;

interface TaskEditButtonsProps {
    onSave: () => void;
    onCancel: () => void;
};

const TaskEditButtons = ({ onSave, onCancel }: TaskEditButtonsProps) => {
    return (
        <StyledButtonsContainer>
        <StyledButton 
            onClick={onSave}
            title='Сохранить изменения'
            $saveEdit
        >
            Сохранить
        </StyledButton>
        <StyledButton
            onClick={onCancel}
            title='Отменить изменения'
        >
            Отменить
        </StyledButton>
    </StyledButtonsContainer>
    )
};  

export default TaskEditButtons;