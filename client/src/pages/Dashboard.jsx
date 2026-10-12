import { useState, useMemo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardCards from '../components/DashboardCards';
import TaskModal from '../components/TaskModal';
import useTasks from '../hooks/useTasks';
import {
  Plus,
  Search,
  ArrowUpDown,
  Edit2,
  Trash2,
  Calendar,
  User,
  AlertCircle,
} from 'lucide-react';

const Dashboard = () => {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === 'All' || task.status === statusFilter;
        const matchesPriority =
          priorityFilter === 'All' || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [tasks, search, statusFilter, priorityFilter, sortOrder]);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm('Are you sure you want to delete this task?')) {
        await removeTask(id);
      }
    },
    [removeTask]
  );

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (formData) => {
    if (taskToEdit) {
      await editTask(taskToEdit._id, formData);
    } else {
      await addTask(formData);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Team Task Board
                </h1>
                <p className="text-m text-slate-500 mt-0.5">
                  Manage, track, and assign  tasks
                </p>
              </div>

              <button
                onClick={handleOpenCreateModal}
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>New Task</span>
              </button>
            </div>

            <DashboardCards tasks={tasks} />

            <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks by title..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="All">All Priorities</option>
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="asc">Due: Soonest first</option>
                  <option value="desc">Due: Furthest first</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loading ? (
              <div className="text-center py-16 text-slate-500 text-sm">
                Loading tasks...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
                <p className="text-slate-700 font-medium text-base">No tasks found</p>
                <p className="text-sm text-slate-400 mt-1">
                  Adjust filters or click "New Task" to create one.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-700">
                      <tr>
                        <th className="px-5 py-3.5">Task Title</th>
                        <th className="px-4 py-3.5">Priority</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5">Due Date</th>
                        <th className="px-4 py-3.5">Assigned To</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTasks.map((task) => (
                        <tr
                          key={task._id}
                          className="hover:bg-amber-50/30 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-900 text-base">
                              {task.title}
                            </div>
                            {task.description && (
                              <div className="text-sm text-slate-500 truncate max-w-sm mt-0.5">
                                {task.description}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`text-sm px-2.5 py-1 rounded-md border font-medium ${getPriorityBadge(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`text-sm px-2.5 py-1 rounded-md border font-medium ${getStatusBadge(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span>{formatDate(task.dueDate)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <User className="w-4 h-4 text-amber-600" />
                              <span className="truncate max-w-[140px]">
                                {task.assignedUser?.name || 'Unassigned'}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEditModal(task)}
                                title="Edit task"
                                className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-slate-100 transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(task._id)}
                                title="Delete task"
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default Dashboard;
