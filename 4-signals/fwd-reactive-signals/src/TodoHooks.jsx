import { useState } from 'react';
import { TaskFormWithHooks } from "./components/TaskFormWithHooks.jsx";
import { TaskListWithHooks } from "./components/TaskListWithHooks.jsx";
import { StatsWithHooks } from "./components/StatsWithHooks.jsx";


export const TodoAppHooks = () => {
    console.log("Rendering TodoAppHooks");

    const [tasks, setTasks] = useState([
        { id: 1, text: "Learn React", completed: true },
        { id: 2, text: "Build a to-do app", completed: false },
        { id: 3, text: "Deploy to production", completed: false },
    ]);

    const handleToggle = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleAdd = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="todo-app">
            <h1>To-Do List with React Hooks</h1>
            <TaskFormWithHooks onAdd={handleAdd} />
            <TaskListWithHooks tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
            <StatsWithHooks tasks={tasks} />
        </div>
    );
};
