import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Footer from './Foot';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'active'
  const [sort, setSort] = useState("dateAdded"); // 'dateAdded', 'name'

  // Load tasks from localStorage when the app initializes
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever the tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, dateAdded: new Date() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Filter and Sort tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "name") return a.taskName.localeCompare(b.taskName);
    if (sort === "dateAdded") return new Date(b.dateAdded) - new Date(a.dateAdded);
    return 0;
  });

  return (
    <div className='flex items-center justify-center '>
    <div className="bg-gray-400 p-3 shadow-lg drop-shadow-lg rounded">
      <h1 className="text-3xl font-bold text-center mt-6 mb-6">To-Do List</h1>
      <TaskForm onAddTask={addTask} />

      <div className="flex justify-between my-4">

        {/* Filter Controls */}
        <div className='mt-10 mb-6'>
          <label className="mr-3">Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>

        {/* Sort Controls */}
        <div className='mt-10 mb-6'>
          <label className="mr-2">Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
            <option value="dateAdded">Date Added</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <TaskList tasks={sortedTasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
      <Footer />
      </div>
     
   </div>
  );
};

export default App;
