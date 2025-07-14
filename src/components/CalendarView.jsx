import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ todos }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isSameDay = (date1, date2) => new Date(date1).toDateString() === new Date(date2).toDateString();

  // Ambil semua tugas yang punya deadline di tanggal yang diklik
  const tasksForDate = todos.filter((todo) => todo.deadline && isSameDay(todo.deadline, selectedDate));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">📅 Kalender Tugas</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="REACT-CALENDAR p-2 rounded-lg"
        tileClassName={({ date }) => {
          // Tandai tanggal jika ada tugas
          const hasTask = todos.some((todo) => todo.deadline && isSameDay(todo.deadline, date));
          return hasTask ? 'bg-indigo-100 text-indigo-800 font-semibold' : null;
        }}
      />
      <div className="mt-4">
        <h3 className="font-semibold mb-1 text-sm text-gray-600 dark:text-gray-300">Tugas pada {selectedDate.toLocaleDateString('id-ID')}:</h3>
        {tasksForDate.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada tugas</p>
        ) : (
          <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200">
            {tasksForDate.map((todo) => (
              <li key={todo.id}>
                {todo.text} <span className="text-xs text-gray-500">({new Date(todo.deadline).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
