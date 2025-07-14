// src/components/StatsProgress.jsx
export default function StatsProgress({ todos }) {
  const total = todos.length;
  const done = todos.filter((todo) => todo.completed).length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">📈 Statistik Tugas</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Total: {total} | Selesai: {done} | Belum: {total - done}
      </p>
      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
        <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-right text-sm text-indigo-600 dark:text-indigo-400 mt-1">{progress}% selesai</p>
    </div>
  );
}
