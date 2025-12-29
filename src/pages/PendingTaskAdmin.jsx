import React, { useState, useEffect } from 'react'
import { getLocalStorage } from "./../utils/localStorage";
import { useNavigate } from "react-router-dom"; // ✅ import

const PendingTaskAdmin = () => {

  const [employees, setEmployees] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    // ✅ Fetch employees from localStorage
    const storedEmployees = getLocalStorage("employee");
    if (storedEmployees) {
      setEmployees(storedEmployees);

      // ✅ Extract only pending tasks across all employees
      const allPending = storedEmployees.flatMap((emp) =>
        emp.tasks
          .filter((task) => task.pending === true)
          .map((task) => ({
            ...task,
            employeeName: emp.name,
            employeeEmail: emp.email,
          }))
      );
      setPendingTasks(allPending);
    }
  }, []);


  const navigate = useNavigate();

  return (
    <div className="">

      {/* Header Section */}
      <header className="flex items-end justify-between bg-[#004e928c] p-5">
        {/* Left: Title + Subtitle */}
        <div>
          <h3 className="text-3xl font-bold text-white">Pending Tasks</h3>
          <p className="text-lg text-gray-500 py-3 ml-5">
            Monitor ongoing tasks and contact employees if urgent.
          </p>
        </div>

        {/* Right: Search + Filters */}
        <div className="flex gap-3">
          {/* Search Bar */}
          <input
            type="search"
            placeholder="Search tasks..."
            className="border border-cyan-800 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
          />
          {/* Search Button */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>

          <select className="border border-gray-300 rounded-md px-2 py-2 text-lg bg-gray-900 cursor-pointer">
            <option>Due Date</option>
            <option>Overdue</option>
            <option>Today</option>
            <option>This Week</option>
          </select>

          <select className="border border-gray-300 rounded-md px-2 py-2 text-lg bg-gray-900 cursor-pointer">
            <option>Employee</option>
            {employees.map((emp) => (
              <option key={emp.id}>{emp.name}</option>
            ))}
          </select>
          {/* Back Button */}
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 mb-5 p-3"
          >
            ⮜ Back to Home
          </button>
        </div>
      </header>

      {/* Pending Tasks Table */}
      <div className='mt-10'>
        {pendingTasks.length > 0 ? (
          <table className="w-full border-collapse border border-gray-700 text-white">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Task</th>
                <th className='p-3 border border-gray-700'>Description</th>
                <th className="p-3 border border-gray-700">Employee</th>
                <th className="p-3 border border-gray-700">Due Date</th>
                <th className="p-3 border border-gray-700">Contact</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map((task, index) => (
                <tr key={index}>
                  <td className="p-3 border border-gray-700">{task.title}</td>
                  <td className='p-3 border border-gray-700'>{task.description}</td>
                  <td className="p-3 border border-gray-700">{task.employeeName}</td>

                  <td className="p-3 border border-gray-700">{task.date}</td>
                  <td className="p-3 border border-gray-700">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${task.employeeEmail}&su=Regarding Pending Task: ${encodeURIComponent(task.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Contact
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">✅ No pending tasks. All caught up!</p>
        )}
      </div>

      <footer className="mt-10 text-gray-400 text-sm">
        © 2025 Employee Management System
      </footer>

    </div>
  )
}

export default PendingTaskAdmin
