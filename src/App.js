import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="App">
      <h1>📝 To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          placeholder="Enter task..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, idx) => (
          <li key={idx} className={task.completed ? "done" : ""}>
            <span onClick={() => toggleComplete(idx)}>{task.text}</span>
            <button onClick={() => deleteTask(idx)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
