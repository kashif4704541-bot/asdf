import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";

const TaskNotesAdmin = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // store ID
  const [replyMessages, setReplyMessages] = useState({}); // per-note replies
  const navigate = useNavigate();

  // Load employees from localStorage on mount
  useEffect(() => {
    const data = getLocalStorage("employee") || [];
    setEmployees(data);
  }, []);

  // Get the selected employee fresh from employees state
  const selectedEmployee = employees.find(
    (emp) => emp.id === selectedEmployeeId
  );

  // Send email (mailto)
  const sendEmail = (empEmail, task, noteText, messageKey) => {
    const message = replyMessages[messageKey] || "";
    if (!message.trim()) {
      alert("Please type a message before sending!");
      return;
    }

    const subject = `Reply regarding task: ${task.title}`;
    const body = `Task Title: ${task.title}
Task Description: ${task.description}
Category: ${task.category}
Employee Note: ${noteText}

--- Admin Reply ---
${message}`;

    window.location.href = `mailto:${empEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Clear only this note's reply
    setReplyMessages((prev) => ({ ...prev, [messageKey]: "" }));
  };

  // Refresh employee data from localStorage
  const refreshEmployees = () => {
    const latestData = getLocalStorage("employee") || [];
    setEmployees(latestData);
  };

  // Handle selecting an employee
  const handleSelectEmployee = (empId) => {
    refreshEmployees();
    setSelectedEmployeeId(empId);
  };

  return (
    <div className="flex min-h-screen bg-[#000428]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#004e92] text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 font-serif">
          Task Notes <span className="ml-10 text-3xl">Section</span>
        </h2>
        <nav className="flex flex-col space-y-3">
          {employees.map((emp) => (
            <button
              key={emp.id}
              onClick={() => handleSelectEmployee(emp.id)}
              className={`text-left px-4 py-2 rounded-lg ${
                selectedEmployee?.id === emp.id
                  ? "bg-[#003b73]"
                  : "hover:bg-[#003b73]"
              }`}
            >
              👤 {emp.name}
            </button>
          ))}
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="w-full text-left px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-[#004e92] transition"
          >
            ⮜ Back to Home
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {!selectedEmployee ? (
          <p className="text-gray-500">Select an employee to view task notes.</p>
        ) : (
          <>
            {/* Header */}
            <header className="bg-[#004e928c] p-4 rounded-xl mb-6 shadow">
              <h2 className="text-3xl font-bold text-white">
                {selectedEmployee.name} – {selectedEmployee.role}
              </h2>
              <p className="text-gray-200">
                Review task notes and reply via email.
              </p>
            </header>

            {/* Notes Section */}
            <div className="space-y-6">
              {selectedEmployee.tasks.some((task) => task.notes?.length > 0) ? (
                selectedEmployee.tasks
                  .filter((task) => task.notes && task.notes.length > 0)
                  .map((task, taskIdx) => (
                    <div
                      key={taskIdx}
                      className="bg-[#0a1a3a] rounded-lg shadow p-5 border-l-4 border-blue-400"
                    >
                      <p className="font-semibold text-white text-2xl   ">
                        📌 {task.title} –{" "}
                        <span className="text-sm text-gray-500">{task.category}</span>
                      </p>
                      <p className="text-sm text-gray-600">{task.description}</p>

                      {/* Notes for this task */}
                      <div className="mt-3 space-y-2">
                        {task.notes.map((note, noteIdx) => {
                          const messageKey = `${taskIdx}-${noteIdx}`; // unique key per note
                          return (
                            <div
                              key={noteIdx}
                              className="bg-[#13274f] border border-blue-500 rounded-lg p-3 text-white"
                            >
                              <p className="text-sm">{note.text}</p>
                              <p className="text-xs text-gray-300">
                                By <span className="font-medium">{note.by}</span> on {note.date}
                              </p>

                              {/* Reply box */}
                              <textarea
                                rows="2"
                                placeholder="Type reply..."
                                value={replyMessages[messageKey] || ""}
                                onChange={(e) =>
                                  setReplyMessages((prev) => ({
                                    ...prev,
                                    [messageKey]: e.target.value,
                                  }))
                                }
                                className="mt-2 w-full border border-blue-500 rounded-md p-2 text-sm bg-[#0a1a3a] text-white focus:outline-none"
                              ></textarea>

                              <button
                                onClick={() =>
                                  sendEmail(
                                    selectedEmployee.email,
                                    task,
                                    note.text,
                                    messageKey
                                  )
                                }
                                className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Send Reply
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 italic">
                  No notes submitted by {selectedEmployee.name}.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default TaskNotesAdmin;
