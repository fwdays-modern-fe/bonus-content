import { signal, computed } from '@preact/signals-react';
import { useState } from 'react';

// Signals-based implementation
const tasksSignal = signal([
    { id: 1, text: "Learn Preact Signals", completed: true },
    { id: 2, text: "Build a to-do app with Signals", completed: false },
    { id: 3, text: "Compare performance", completed: false },
]);

const completedCount = computed(() =>
    tasksSignal.value.filter(task => task.completed).length
);
const totalCount = computed(() => tasksSignal.value.length);
const percentComplete = computed(() =>
    totalCount.value ? Math.round((completedCount.value / totalCount.value) * 100) : 0
);

const TaskWithSignals = ({ task }) => {
    const handleToggle = (id) => {
        tasksSignal.value = tasksSignal.value.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
    };

    const handleDelete = (id) => {
        tasksSignal.value = tasksSignal.value.filter(task => task.id !== id);
    };

    return (
        <div className="task" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
    );
};

const TaskListWithSignals = () => {
    console.log("Rendering TaskList (Signals)");

    return (
        <div className="task-list">
            {tasksSignal.value.map(task => (
                <TaskWithSignals key={task.id} task={task} />
            ))}
        </div>
    );
};

const TaskFormWithSignals = () => {
    const [text, setText] = useState('');
    console.log("Rendering TaskForm (Signals)");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            const newTask = {
                id: Date.now(),
                text: text.trim(),
                completed: false
            };
            tasksSignal.value = [...tasksSignal.value, newTask];
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
            />
            <button type="submit">Add</button>
        </form>
    );
};

const StatsWithSignals = () => {
    console.log("Rendering Stats (Signals)");

    return (
        <div className="stats">
            <p>
                {completedCount.value} out of {totalCount.value} tasks completed
                ({percentComplete.value}%)
            </p>
        </div>
    );
};

export const TodoAppSignals = () => {
    console.log("Rendering TodoAppSignals");

    return (
        <div className="todo-app">
            <h1>To-Do List with Preact Signals</h1>
            <TaskFormWithSignals />
            <TaskListWithSignals />
            <StatsWithSignals />
        </div>
    );
};
