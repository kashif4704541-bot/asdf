import React, { useEffect, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "../../utils/localStorage";

/* ----------------- MiniCalendar ----------------- */
/* Accepts `employees` as a prop so it always shows up-to-date events */
function MiniCalendar({ employees }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [holidays, setHolidays] = useState([]);

  // Year and month for the current view
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based

  // first day index (0 = Sunday) and days in month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fetch holidays dynamically from Calendarific (kept as you had)
  useEffect(() => {
    const API_KEY = "YFMkO84nzPxwhKdfmQvV9WMJklvEFrG3";
    fetch(`https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=PK&year=${year}`)
      .then(res => res.json())
      .then(data => {
        if (data?.meta?.code !== 200) {
          console.error("Holiday API error:", data?.meta);
          return;
        }

        if (data?.response?.holidays) {
          const allowedKeywords = [
            // Muslim religious holidays
            "Eid", "Ramadan", "Ashura", "Shab", "Milad", "Chelum",
            // Pakistan national holidays
            "Pakistan", "Independence", "Labour", "Iqbal", "Quaid"
          ];

          const filtered = data.response.holidays.filter(h => {
            if (h.primary_type !== "Public Holiday") return false; // skip optional/observance
            return allowedKeywords.some(keyword => h.name.toLowerCase().includes(keyword.toLowerCase()));
          });

          const formatted = filtered.map(h => ({
            date: h.date.iso,
            name: h.name,
          }));

          setHolidays(formatted);
        }
      })
      .catch(err => console.error("Holiday API error:", err));
  }, [year]);




  // Utility: build YYYY-MM-DD for a cell (no Date parsing -> no timezone shifts)
  const formatCellDate = (y, mZeroBased, d) => {
    const Y = y;
    const M = String(mZeroBased + 1).padStart(2, "0");
    const D = String(d).padStart(2, "0");
    return `${Y}-${M}-${D}`;
  };

  // Ordinal (1st, 2nd, 3rd, 4th)
  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  // Gather events for a given date string (YYYY-MM-DD)
  const getEventsForDate = (dateStr) => {
    const events = [];

    // holidays
    (holidays || []).forEach(h => {
      if (h.date === dateStr) events.push({ type: "holiday", name: h.name });
    });

    // employee tasks
    (employees || []).forEach(emp => {
      (emp.tasks || []).forEach(task => {
        if (task.date === dateStr) events.push({ type: "task", name: task.title });
      });
    });

    // employee leaves (a leave entry can contain multiple dates)
    (employees || []).forEach(emp => {
      (emp.leaves || []).forEach(leave => {
        (leave.dates || []).forEach(d => {
          if (d === dateStr) events.push({ type: "leave", name: `${emp.name} (${leave.reason || "Leave"})` });
        });
      });
    });

    // meetings (if any)
    (employees || []).forEach(emp => {
      (emp.meetings || []).forEach(m => {
        if (m.date === dateStr) events.push({ type: "meeting", name: `${m.title} (${emp.name})` });
      });
    });

    return events;
  };

  // today's ISO using the same formatting to avoid timezone shifts
  const todayISO = formatCellDate(today.getFullYear(), today.getMonth(), today.getDate());

  // dot colors (tailwind classes)
  const dotColors = {
    holiday: "bg-red-500",
    task: "bg-green-400",
    leave: "bg-green-400",
    meeting: "bg-blue-400",
  };

  return (
    <div className="bg-[#111827] rounded-2xl shadow-lg p-6 w-full h-full text-white flex flex-col mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>◀</button>
        <h2 className="font-bold text-lg">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>▶</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-sm font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar grid: include leading empty cells for the first week */}
      <div className="grid grid-cols-7 text-center">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const cellDate = formatCellDate(year, month, day);
          const events = getEventsForDate(cellDate);

          return (
            <div
              key={day}
              className={`relative p-2 flex flex-col items-center justify-center rounded ${cellDate === todayISO ? "bg-blue-600 text-white font-bold" : ""}`}
            >
              <div className="w-full flex justify-center">
                <span>{day}</span>
              </div>

              {/* Dots for events (kept compact) */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                {events.map((e, idx) => (
                  <span
                    key={idx}
                    title={e.name}
                    className={`w-2 h-2 rounded-full ${dotColors[e.type] || "bg-gray-400"}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event List (labels) */}
      <div className="mt-4 space-y-2 text-sm">
        {/* Holidays: show if any in month */}
        {(holidays || []).filter(h => {
          // month match without Date parsing
          const parts = h.date.split("-");
          if (parts.length < 2) return false;
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10) - 1;
          return y === year && m === month;
        }).length > 0 && (
            <div className="flex flex-wrap items-center gap-4 mb-2">
              {(holidays || [])
                .filter(h => {
                  const parts = h.date.split("-");
                  if (parts.length < 2) return false;
                  const y = parseInt(parts[0], 10);
                  const m = parseInt(parts[1], 10) - 1;
                  return y === year && m === month;
                })
                .map((h, idx) => {
                  const day = parseInt(h.date.split("-")[2], 10);
                  return (
                    <div key={idx} className="flex items-center gap-1 text-sm">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      <span className="text-red-300">{`${day}${getOrdinalSuffix(day)} – ${h.name}`}</span>
                    </div>
                  );
                })}
            </div>
          )}

        {/* Leaves */}
        {(employees || []).flatMap(emp =>
          (emp.leaves || []).map((leave, idx) => {
            // filter leave dates in current month
            const leaveDatesInMonth = (leave.dates || []).filter(d => {
              const parts = d.split("-");
              if (parts.length < 3) return false;
              const y = parseInt(parts[0], 10);
              const m = parseInt(parts[1], 10) - 1;
              return y === year && m === month;
            });

            if (leaveDatesInMonth.length === 0) return null;

            return (
              <div key={`${emp.name}-leave-${idx}`} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                <span className="text-emerald-400">
                  {emp.name} – {leaveDatesInMonth.map(d => parseInt(d.split("-")[2], 10)).join(", ")}{" "}
                  <span className="text-gray-400">({leave.reason || "Leave"})</span>
                </span>
              </div>
            );
          })
        )}

        {/* Meetings */}
        {(employees || []).flatMap(emp =>
          (emp.meetings || []).map((m, idx) => {
            const parts = m.date.split("-");
            if (parts.length < 3) return null;
            const y = parseInt(parts[0], 10);
            const mm = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            if (y !== year || mm !== month) return null;

            return (
              <div key={`${emp.name}-meeting-${idx}`} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
                <span className="text-blue-400">
                  {day}{getOrdinalSuffix(day)} – {m.title} <span className="text-gray-400">({m.description || ""})</span>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ----------------- Employee Management ----------------- */
const EmployeeManagment = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
    password: "123",
    tasks: []
  });

  // Load employees from localStorage on mount (seed if empty)
  useEffect(() => {
    const storedData = getLocalStorage("employee");
    if (storedData && storedData.length > 0) {
      setEmployees(storedData);
    } else {
      // If your utils.saveLocalStorage seeds the default data, call it
      if (typeof saveLocalStorage === "function") saveLocalStorage();
      const initialData = getLocalStorage("employee");
      setEmployees(initialData || []);
    }
  }, []);

  // Persist employees to localStorage whenever updated
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("employee", JSON.stringify(employees));
    }
  }, [employees]);

  // Add Employee
  const handleAdd = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      alert("Please fill all fields");
      return;
    }
    const newEmp = { ...newEmployee, id: Date.now() };
    setEmployees([...employees, newEmp]);
    setNewEmployee({ name: "", email: "", role: "", status: "Active", password: "123", tasks: [] });
  };

  // Update Employee
  const handleUpdate = (id, updatedData) => {
    const updatedList = employees.map(emp => {
      if (emp.id === id) {
        const newStatus = isOnLeave(emp) ? "On Leave" : (updatedData.status ?? emp.status);
        return { ...emp, ...updatedData, status: newStatus };
      }
      return emp;
    });
    setEmployees(updatedList);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-xl relative">
          <button onClick={onClose} className="absolute top-2 right-4 text-white text-xl hover:text-red-400">&times;</button>
          {children}
        </div>
      </div>
    );
  };

  // Remove Employee
  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  // Is employee on leave **today** (strict match)
  const isOnLeave = (emp) => {
    const todayISO = new Date().toISOString().split("T")[0];
    return (emp?.leaves || []).some((leave) =>
      (leave.dates || []).includes(todayISO)
    );
  };

  // Status badge color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-600 text-white px-2 py-1 rounded-full text-sm";
      case "On Leave":
        return "bg-yellow-600 text-white px-2 py-1 rounded-full text-sm";
      case "Inactive":
        return "bg-red-700 text-white px-2 py-1 rounded-full text-sm";
      default:
        return "bg-gray-600 text-white px-2 py-1 rounded-full text-sm";
    }
  };

  return (
    <div className="text-gray-200 p-6 mt-4">
      <div className="flex gap-8 items-stretch">
        {/* Employee Management Section */}
        <div className="rounded-2xl shadow-lg p-6 w-2/3 h-full">
          <h1 className="text-2xl font-semibold text-white mb-6">Employee Management</h1>

          {/* Add Employee Form */}
          <div className="mb-6 flex gap-2 items-center">
            <input type="text" placeholder="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} className="px-2 py-1 rounded-lg bg-gray-800 text-white" />
            <input type="email" placeholder="Email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} className="px-2 py-1 rounded-lg bg-gray-800 text-white" />
            <input type="text" placeholder="Role" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} className="px-2 py-1 rounded-lg bg-gray-800 text-white" />
            <button onClick={handleAdd} className="ml-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">➕ Add</button>
          </div>

          {/* Employee Table */}
          <div id="employeeList" className="max-h-60 overflow-y-auto">
            <table className="w-full text-center border-collapse overflow-x-hidden">
              <thead className="sticky top-0 bg-gray-900 z-10">
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-4">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Tasks</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  editId === emp.id ? (
                    // Edit Mode Row
                    <tr key={emp.id} className="border-b border-gray-800 bg-gray-900">
                      <td className="py-3">
                        <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="bg-gray-800 text-white px-2 py-1 rounded w-full" />
                      </td>
                      <td>
                        <input type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="bg-gray-800 text-white px-2 py-1 rounded w-full" />
                      </td>
                      <td>
                        <input type="text" value={editData.role} onChange={(e) => setEditData({ ...editData, role: e.target.value })} className="bg-gray-800 text-white px-2 py-1 rounded w-full" />
                      </td>
                      <td>
                        <select
                          value={isOnLeave(emp) ? "On Leave" : (editData.status ?? emp.status)}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          disabled={isOnLeave(emp)}
                          className={`bg-gray-800 text-white px-2 py-1 rounded w-full cursor-pointer ${isOnLeave(emp) ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td>{emp.tasks?.length || 0}</td>
                      <td className="flex space-x-2 justify-center">
                        <button onClick={() => { handleUpdate(emp.id, editData); setEditId(null); setEditData({}); }} className="px-2 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white">✅</button>
                        <button onClick={() => { setEditId(null); setEditData({}); }} className="px-2 py-1 rounded-lg bg-gray-600 hover:bg-gray-700 text-white">❌</button>
                      </td>
                    </tr>
                  ) : (
                    // Normal View Row
                    <tr key={emp.id} className="border-b border-gray-800 hover:bg-[#1e293b]">
                      <td className="py-3">{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.role}</td>
                      <td>
                        <span className={getStatusColor(isOnLeave(emp) ? "On Leave" : emp.status)}>
                          {isOnLeave(emp) ? "On Leave" : emp.status}
                        </span>
                      </td>
                      <td>{emp.tasks?.length || 0}</td>
                      <td className="px-4 py-2 flex space-x-2 justify-center">
                        <div className="relative group">
                          <button onClick={() => { setEditId(emp.id); setEditData({ ...emp }); setIsModalOpen(true); }} className="px-2 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white">✏️</button>
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-gray-800 text-white text-xs px-2 py-1 whitespace-nowrap z-10">Edit</span>
                        </div>

                        <div className="relative group">
                          <button onClick={() => handleRemove(emp.id)} className="px-2 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white">🗑</button>
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-gray-800 text-white text-xs px-2 py-1 whitespace-nowrap z-10">Remove</span>
                        </div>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>

            </table>
          </div>

        </div>

        {/* Calendar Section (pass employees so calendar updates) */}
        <div className="w-1/3 h-full">
          <MiniCalendar employees={employees} />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input type="text" placeholder="Name" value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="bg-gray-800 p-2 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" placeholder="Email" value={editData.email || ""} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="bg-gray-800 p-2 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Role</label>
            <input type="text" placeholder="Role" value={editData.role || ""} onChange={(e) => setEditData({ ...editData, role: e.target.value })} className="bg-gray-800 p-2 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <select value={isOnLeave(editData) ? "On Leave" : (editData.status || "Active")} onChange={(e) => setEditData({ ...editData, status: e.target.value })} disabled={isOnLeave(editData)} className={`bg-gray-800 p-2 rounded w-full ${isOnLeave(editData) ? "opacity-50 cursor-not-allowed" : ""}`}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-4">
          <button onClick={() => { setIsModalOpen(false); setEditId(null); setEditData({}); }} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">Cancel</button>
          <button onClick={() => { handleUpdate(editId, editData); setIsModalOpen(false); setEditId(null); setEditData({}); }} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeManagment;
