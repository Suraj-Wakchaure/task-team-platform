import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    const res = await api.post('/tasks', taskData);
    setTasks((prev) => [res.data, ...prev]);
    return res.data;
  };

  const editTask = async (id, updatedData) => {
    const res = await api.put(`/tasks/${id}`, updatedData);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    return res.data;
  };

  const removeTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return {
    tasks,
    loading,
    error,
    refreshTasks: fetchTasks,
    addTask,
    editTask,
    removeTask,
  };
};

export default useTasks;
