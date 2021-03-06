import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const response = await fetch('http://localhost:7000/todos');
    if (response.ok) {
        const todos = await response.json();
        return { todos }
    }
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (payload) => {
    const response = await fetch('http://localhost:7000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: payload.title })
    });
    if (response.ok) {
        const todo = await response.json();
        return { todo }
    }
})

const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            }
            state.push(newTodo);
        },
        toggleComplete: (state, action) => {
            state.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.completed = !todo.completed;
                }
            })
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id)
        }
    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo)
        }
    }
})

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;