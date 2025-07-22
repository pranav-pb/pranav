import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit3 } from "react-icons/fi";
import "./TodoList.css";
import backgroundImage from "../../assets/download.png";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
        },
      ]);
      setNewTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditClick = (id, currentText) => {
    setEditingTaskId(id);
    setEditingText(currentText);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSave = (id) => {
    if (editingText.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleEditSave(id);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div
      className="todo-app-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="todo-container">
        <div className="header-section">
          <div className="header-text">
            <h1>Task Done</h1>
            <p className="keep-up">Keep it up</p>
          </div>
          <div className="progress-circle">
            {completedCount}/{totalTasks}
          </div>
        </div>

        <div className="next-task-box">
          <h2>Write your next task</h2>
          <div className="task-input-box">
            <input
              type="text"
              placeholder="Enter a task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="add-task-btn" onClick={handleAddTask}>
              <FiPlus />
            </button>
          </div>
        </div>

        <ul className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="left-content">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>

                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={handleEditChange}
                      onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                      onBlur={() => handleEditSave(task.id)}
                      className="edit-task-input"
                      autoFocus
                    />
                  ) : (
                    <div className="tooltip-container">
                      <span
                        className={`task-text ${
                          task.completed ? "completed" : ""
                        }`}
                        onDoubleClick={() =>
                          handleEditClick(task.id, task.text)
                        }
                      >
                        {task.text}
                      </span>
                      <span className="tooltip-text">{task.text}</span>
                    </div>
                  )}
                </div>

                <div className="task-actions">
                  <FiEdit3
                    className="edit-icon"
                    onClick={() => handleEditClick(task.id, task.text)}
                  />
                  <FiTrash2
                    className="delete-icon"
                    onClick={() => handleRemoveTask(task.id)}
                  />
                </div>
              </li>
            ))
          ) : (
            <p className="no-tasks-message">
              No tasks yet. Add your first task!
            </p>
          )}
        </ul>

        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default TodoList;
