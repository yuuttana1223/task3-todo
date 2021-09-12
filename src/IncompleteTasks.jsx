import { memo } from "react";

export const IncompleteTasks = memo(
  ({ tasks, editTask, deleteTask, completeTask }) => {
    return (
      <>
        <div className="incomplete-area">
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <span onClick={() => editTask(task)}>{task}</span>
                <button onClick={() => completeTask(task)}>完了</button>
                <button onClick={() => deleteTask(task)}>削除</button>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
);
