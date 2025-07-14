import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ExportExcel({ todos }) {
  const exportToExcel = () => {
    const data = todos.map((todo) => ({
      Tugas: todo.text,
      Kategori: todo.category,
      Deadline: todo.deadline ? new Date(todo.deadline).toLocaleString('id-ID') : '-',
      Selesai: todo.completed ? '✔' : '❌',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Todos');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'todos.xlsx');
  };

  return (
    <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mt-2">
      📥 Export ke Excel
    </button>
  );
}
