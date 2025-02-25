export const TaskWithHooks = ({ task, onToggle, onDelete }) => {
    return (
        <div className="task" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};