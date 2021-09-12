import { memo, useCallback, useState } from "react";

export const CompleteTasks = memo(({ tasks }) => {
  const [isDisplaying, setIsDisplaying] = useState(false);

  const showTasks = useCallback(() => {
    if (tasks.length === 0) return;
    setIsDisplaying(true);
  }, [tasks]);

  return (
    <>
      <div className="complete-area">
        <button onClick={showTasks}>
          {isDisplaying ? "表示しているよ" : "表示ボタン"}
        </button>
        {isDisplaying && (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
});
