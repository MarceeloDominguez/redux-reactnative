import {createSlice} from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface InitialState {
  tasks: Task[];
}

const initialState: InitialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const {valueInput, id} = action.payload;
      const taskFound = state.tasks.find(task => task.id === id);

      taskFound ? (taskFound.title = valueInput.title) : taskFound;
    },
    toggleTask: (state, action) => {
      const id = action.payload;
      const taskToToggle = state.tasks.find(task => task.id === id);

      taskToToggle
        ? (taskToToggle.completed = !taskToToggle.completed)
        : taskToToggle;
    },
  },
});

export const {addTask, deleteTask, editTask, toggleTask} = taskSlice.actions;
export default taskSlice.reducer; //taskReducer en el store
