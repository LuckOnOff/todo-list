interface TaskState {
    isShow: boolean;
    isEdit: boolean;
    isChecked: boolean;
    name: string;
    prevName: string;
    showModal: boolean;
  };
  
  type Action =
    | { type: 'TOGGLE_SHOW'; }
    | { type: 'TOGGLE_CHECK'; }
    | { type: 'SHOW_MODAL'; show: boolean }
    | { type: 'TOGGLE_EDIT'; }
    | { type: 'CANCEL_EDIT'; }
    | { type: 'CHANGE_NAME', data: string };

export const taskReducer = (state: TaskState, action: Action): TaskState => {
    switch(action.type) {
        case 'TOGGLE_SHOW':
            return {
                ...state,
                isShow: !state.isShow
            }
        case 'TOGGLE_CHECK':
            return {
                ...state,
                isChecked: !state.isChecked
            }
        case 'TOGGLE_EDIT':
            return {
                ...state,
                isEdit: !state.isEdit,
                prevName: state.isEdit ? state.prevName : state.name
            }
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.data
            }
        case 'CANCEL_EDIT':
            return {
                ...state,
                name: state.prevName,
                isEdit: false,
                showModal: false
            }
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: action.show
            }
        default: {
            throw new Error('Неизвестное действие');
        }
    }
};