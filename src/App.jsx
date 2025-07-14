import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import DarkModeToggle from './components/DarkModeToggle';
import CalendarView from './components/CalendarView';
import StatsProgress from './components/StatsProgress';
import ExportExcel from './components/ExportExcel';

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });

  const [input, setInput] = useState('');
  const [category, setCategory] = useState('kerja');
  const [deadline, setDeadline] = useState('');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach((todo) => {
        if (todo.deadline && !todo.notified && new Date(todo.deadline) <= now && !todo.completed) {
          new Notification('⏰ Reminder Tugas', {
            body: todo.text,
          });

          setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, notified: true } : t)));
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editId !== null) {
      setTodos((prev) => prev.map((todo) => (todo.id === editId ? { ...todo, text: input, category, deadline } : todo)));
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input.trim(),
          category,
          completed: false,
          timestamp: getTimestamp(),
          deadline,
          notified: false,
        },
      ]);
    }

    setInput('');
    setCategory('kerja');
    setDeadline('');
  };

  const handleToggle = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const toEdit = todos.find((todo) => todo.id === id);
    setInput(toEdit.text);
    setCategory(toEdit.category);
    setDeadline(toEdit.deadline || '');
    setEditId(id);
  };

  const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()));
  const incompleteTasks = filteredTodos.filter((todo) => !todo.completed);
  const completeTasks = filteredTodos.filter((todo) => todo.completed);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100 dark:bg-gray-900 transition">
      <DarkModeToggle />
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600 dark:text-indigo-400">Smart To-Do List</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <StatsProgress todos={todos} />
          <ExportExcel todos={todos} />
          <CalendarView todos={todos} />
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="text" placeholder="Tambahkan tugas..." className="w-full p-2 border rounded-lg focus:outline-none" value={input} onChange={(e) => setInput(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded-lg">
              <option value="kerja">Kerja</option>
              <option value="kuliah">Kuliah</option>
              <option value="pribadi">Pribadi</option>
              <option value="urgent">Urgent</option>
            </select>
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="p-2 border rounded-lg" />
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              {editId !== null ? 'Update' : 'Add'}
            </button>
          </form>

          <input type="text" placeholder="🔍 Cari tugas..." className="w-full p-2 border rounded-lg" value={search} onChange={(e) => setSearch(e.target.value)} />

          <section>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">⏳ Belum Selesai</h2>
            {incompleteTasks.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada tugas aktif</p>
            ) : (
              incompleteTasks.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />)
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">✅ Selesai</h2>
            {completeTasks.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada tugas selesai</p>
            ) : (
              completeTasks.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />)
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
