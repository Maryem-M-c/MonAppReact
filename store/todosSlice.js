import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Ajouter une tâche au tableau
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      // Supprimer la tâche dont l'id correspond à action.payload
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

// Export des actions à utiliser dans les composants
export const { addTodo, removeTodo } = todosSlice.actions;

// Export du reducer à fournir au store
export default todosSlice.reducer;
