import React, { useState, useEffect } from "react";
import { getLocalStorage } from "./../utils/localStorage";
import { useNavigate } from "react-router-dom";

const CompletedTasksAdmin = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = getLocalStorage("employee");
    if (storedEmployees) {
      const allCompleted = storedEmployees.flatMap((emp) =>
        emp.tasks
          .filter((task) => task.completed === true)
          .map((task) => ({
            ...task,
            employeeName: emp.name,
            employeeEmail: emp.email,
          }))
      );
      setCompletedTasks(allCompleted);
    }
  }, []);

  // ✅ Handle Download
  const handleDownload = (task) => {
    const blob = new Blob([JSON.stringify(task, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${task.title.replace(/\s+/g, "_")}.json`;
    link.click();
  };

  // ✅ Handle Reopen (set completed=false, pending=true)
  const handleReopen = (taskIndex) => {
    alert(`Reopen task: ${completedTasks[taskIndex].title}`);
    // TODO: Update localStorage state here
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-[#004e928c] p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Completed Tasks</h2>
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 p-3"
          >
            ⮜ Back to Home
          </button>
        </div>
      </header>

      {/* Completed Tasks Table */}
      <div className="mt-10">
        {completedTasks.length > 0 ? (
          <table className="w-full border-collapse border border-gray-700 text-white">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">S.No</th>
                <th className="p-3 border border-gray-700">Task Title</th>
                <th className="p-3 border border-gray-700">Task Description</th>
                <th className="p-3 border border-gray-700">Employee</th>
                <th className="p-3 border border-gray-700">Deadline</th>
                <th className="p-3 border border-gray-700">Status</th>
                <th className="p-3 border border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={index} className="hover:bg-gray-900">
                  <td className="p-3 border border-gray-700">{index + 1}</td>
                  <td className="p-3 border border-gray-700">{task.title}</td>
                  <td className="p-3 border border-gray-700">{task.description}</td>
                  <td className="p-3 border border-gray-700">{task.employeeName}</td>
                  <td className="p-3 border border-gray-700">{task.date}</td>
                  <td className="p-3 border border-gray-700 text-green-400 font-semibold">
                    Completed
                  </td>
                  <td className="p-3 border border-gray-700 flex gap-2">
                    <button
                      onClick={() => handleDownload(task)}
                      className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleReopen(index)}
                      className="px-3 py-1 bg-yellow-600 rounded-md hover:bg-yellow-700"
                    >
                      Reopen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">✅ No Completed tasks. All caught up!</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTasksAdmin;
