const categoryColor = {
  kerja: 'bg-blue-100 text-blue-700',
  kuliah: 'bg-green-100 text-green-700',
  pribadi: 'bg-yellow-100 text-yellow-700',
  urgent: 'bg-red-100 text-red-700',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex justify-between items-start bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-2">
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="mt-1 h-4 w-4" />
        <div>
          <p className={`text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>{todo.text}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{todo.timestamp}</p>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColor[todo.category]}`}>{todo.category}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(todo.id)} className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}
