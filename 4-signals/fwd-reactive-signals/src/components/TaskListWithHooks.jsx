import { TaskWithHooks } from "./TaskWithHooks.jsx";

export const TaskListWithHooks = ({ tasks, onToggle, onDelete }) => {
    console.log("Rendering TaskList (Hooks)");

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskWithHooks
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
