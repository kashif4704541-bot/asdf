// EmployeePerformance.jsx
import React, { useEffect, useState } from "react";

const EmployeePerformance = ({ employee }) => {
  const [taskCounts, setTaskCounts] = useState({
    newTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (employee?.tasks) {
      const newTasks = employee.tasks.filter(t => t.newTask).length;
      const completedTasks = employee.tasks.filter(t => t.completed).length;
      const pendingTasks = employee.tasks.filter(t => t.pending).length;

      setTaskCounts({ newTasks, completedTasks, pendingTasks });

      const notifList = employee.tasks
        .filter(t => t.pending || t.newTask)
        .map(t => ({
          message: t.pending
            ? `⚠️ Pending task '${t.title}' needs attention`
            : `🔔 New task '${t.title}' assigned`,
          type: t.pending ? "alert" : "info",
          time: t.date,
        }));
      setNotifications(notifList);
    }
  }, [employee]);

  const total = taskCounts.newTasks + taskCounts.completedTasks + taskCounts.pendingTasks || 1;
  const newPercent = (taskCounts.newTasks / total) * 100;
  const completedPercent = (taskCounts.completedTasks / total) * 100;
  const completedPercentage = Math.round((taskCounts.completedTasks / total) * 100);

  return (
    <div className="p-6 h-auto flex flex-col gap-8 mt-24">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-white text-2xl font-bold text-center w-1/2">
          Employee Performance
        </h2>
        <h2 className="text-white text-2xl font-bold text-center w-1/2">
          Notifications / Alerts
        </h2>
      </div>

      <div className="flex gap-20">
        <div className="flex-1 flex gap-6">
          <div
            className="w-72 h-72 rounded-full relative"
            style={{
              background: `conic-gradient(
                #1E90FF 0 ${newPercent}%,
                #28a745 ${newPercent}% ${newPercent + completedPercent}%,
                #FFA500 ${newPercent + completedPercent}% 100%
              )`,
            }}
          >
            <div className="w-44 h-44 bg-[#000428] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white">
              <span className="text-2xl font-bold">{completedPercentage}%</span>
              <span className="text-sm">Completed</span>
            </div>
          </div>

          <div className="flex flex-col gap-8 text-white text-lg justify-center ml-12">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span> New Tasks: {taskCounts.newTasks}
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span> Completed: {taskCounts.completedTasks}
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-orange-500 rounded-full"></span> Pending: {taskCounts.pendingTasks}
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-8 justify-end">
          <div
            id="notification"
            className="bg-[#0d1a3a] p-6 rounded-xl shadow-lg max-h-80 overflow-y-auto"
            style={{ flexBasis: "520px" }}
          >
            <h3 className="text-white text-xl font-semibold mb-4">Notifications</h3>
            <ul className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <li key={index} className="p-3 rounded-md text-white">
                    <p className="font-medium">{notif.message}</p>
                    <span className="text-sm text-gray-200">{notif.time}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-300">No new notifications</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformance;
