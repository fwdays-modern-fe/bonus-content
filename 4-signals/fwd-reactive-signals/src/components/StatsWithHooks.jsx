export const StatsWithHooks = ({ tasks }) => {
    console.log("Rendering Stats (Hooks)");

    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;

    return (
        <div className="stats">
            <p>
                {completed} out of {total} tasks completed
                ({total ? Math.round((completed / total) * 100) : 0}%)
            </p>
        </div>
    );
};
