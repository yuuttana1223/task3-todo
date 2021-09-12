import { useCallback, useState } from "react";
import { CompleteTasks } from "./CompleteTasks";
import { IncompleteTasks } from "./IncompleteTasks";

export const App = () => {
  const [inputText, setInputText] = useState("");
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const addTask = useCallback(() => {
    if (!inputText.trim()) {
      alert("やることを入力してください");
      return;
    } else if (incompleteTasks.includes(inputText)) {
      alert("同名の項目が存在します");
      return;
    }

    setIncompleteTasks([...incompleteTasks, inputText]);
    setInputText("");
  }, [inputText, incompleteTasks]);

  const editTask = useCallback((task) => {
    setIsEditing(true);
    setInputText(task);
    setSelectedTask(task);
  }, []);

  const updateTask = useCallback(() => {
    if (!inputText.trim()) {
      alert("やることを入力してください");
      return;
    } else if (selectedTask === inputText) {
      alert("編集項目が変更されていません");
      return;
    } else if (incompleteTasks.includes(inputText)) {
      alert("同名の項目が存在します");
      return;
    }
    // 選んだタスクを入力した文字に変更
    const newTasks = incompleteTasks.map((task) =>
      selectedTask === task ? inputText : task
    );
    setIncompleteTasks(newTasks);
    setInputText("");
    setIsEditing(false);
  }, [inputText, selectedTask, incompleteTasks]);

  const deleteTask = useCallback(
    (task) => {
      const newTasks = incompleteTasks.filter((prevTask) => prevTask !== task);
      setIncompleteTasks(newTasks);
    },
    [incompleteTasks]
  );

  const completeTask = useCallback(
    (task) => {
      deleteTask(task);
      setCompleteTasks([...completeTasks, task]);
    },
    [deleteTask, completeTasks]
  );

  return (
    <>
      {completeTasks.length === 5 ? (
        <h1>Bootcamp突破おめでとう!!</h1>
      ) : (
        <div className="container">
          <h1>Todoリスト作成</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="やること"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={isEditing ? updateTask : addTask}>保存</button>
          </form>
          <h2>Todoリスト</h2>
          <div className="todo-list">
            <IncompleteTasks
              tasks={incompleteTasks}
              editTask={editTask}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
            <CompleteTasks tasks={completeTasks} />
          </div>
        </div>
      )}
    </>
  );
};
