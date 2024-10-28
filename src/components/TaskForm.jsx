import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !description) {
      setError('Both fields are required');
      return;
    }
    onAddTask({ id: Date.now(), taskName, description, completed: false });
    setTaskName('');
    setDescription('');
    setError('');
  };

  return (  
    <form onSubmit={handleSubmit} className="items-center justify-center mb-2 p-4 bg-white drop-shadow-lg shadow-md rounded">
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded ">Add Task</button>
    </form>
    
  );
};

export default TaskForm;
