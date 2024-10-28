import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);

  const toggleComplete = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
  };

  const handleUpdate = () => {
    onUpdateTask({ ...task, taskName, description });
    setIsEditing(false);
  };

  return (
    <div className={`p-4 mb-2 ${task.completed ? 'bg-gray-200' : 'bg-white'} shadow-md rounded`}>
      {isEditing ? (
        <>
          <input
            className="w-full p-2 border rounded mb-2"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white p-1 rounded mr-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-1 rounded">Cancel</button>
        </>
      ) : (
        <>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>{task.taskName}</h3>
          <p className={task.completed ? 'line-through' : ''}>{task.description}</p>
          <button onClick={toggleComplete} className="mr-2 bg-yellow-500 text-white p-1 rounded">
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => setIsEditing(true)} className="mr-2 bg-blue-500 text-white p-1 rounded">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-1 rounded">Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
