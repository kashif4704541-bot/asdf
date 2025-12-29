import React, { useState, useEffect } from "react";
import { getLocalStorage, saveLocalStorage } from "../../utils/localStorage";

const Tasklist = ({ employeeId }) => {
  const [employees, setEmployees] = useState(() => getLocalStorage("employee") || []);

  // ✅ derive employee every render
  const empIndex = employees.findIndex((e) => e.id === employeeId);
  const employee = employees[empIndex];

  if (!employee) {
    return (
      <div className="text-white text-center mt-10">
        ⚠️ No employee found with ID {employeeId}
      </div>
    );
  }

  // state
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [noteVisible, setNoteVisible] = useState(false)
  const [noteInput, setNoteInput] = useState({});
  const [popupOpen, setPopupOpen] = useState(null);
  const [extensionData, setExtensionData] = useState({ days: "", reason: "" });
  const [successMessage, setSuccessMessage] = useState(null);

  // show only active/pending
  const displayTasks = employee.tasks.filter((t) => !t.completed);

  // --- File Upload ---
  const handleFileUpload = (taskId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFiles((prev) => ({
      ...prev,
      [taskId]: file,
    }));
  };

  const handleSubmitFile = (taskId) => {
    if (!uploadedFiles[taskId]) {
      setSuccessMessage("❗ Please select a file first.");
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    const updatedEmployees = [...employees];
    const taskIndex = updatedEmployees[empIndex].tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) return;

    updatedEmployees[empIndex].tasks[taskIndex] = {
      ...updatedEmployees[empIndex].tasks[taskIndex],
      completed: true,
      active: false,
      pending: false,
      file: uploadedFiles[taskId],
    };

    setEmployees(updatedEmployees);
    saveLocalStorage("employee", updatedEmployees);

    setUploadedFiles((prev) => {
      const updated = { ...prev };
      delete updated[taskId];
      return updated;
    });

    setSuccessMessage("✅ Task submitted & marked as completed!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // --- Submit Note ---
  const handleNoteSubmit = (taskId) => {
    if (!noteInput[taskId] || noteInput[taskId].trim() === "") {
      setSuccessMessage("❗ Please write a note before submitting.");
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    const updatedEmployees = [...employees];
    const taskIndex = updatedEmployees[empIndex].tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      if (!updatedEmployees[empIndex].tasks[taskIndex].notes) {
        updatedEmployees[empIndex].tasks[taskIndex].notes = [];
      }
      updatedEmployees[empIndex].tasks[taskIndex].notes.push(noteInput[taskId]);
      saveLocalStorage("employee", updatedEmployees);
      setEmployees(updatedEmployees);
    }

    setNoteInput((prev) => ({ ...prev, [taskId]: "" }));
    setNoteVisible((prev) => ({ ...prev, [taskId]: false }));

    setSuccessMessage("📝 Note saved to task!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // --- Submit Extension ---
  const handleExtensionSubmit = () => {
    if (!extensionData.days || !extensionData.reason) {
      setSuccessMessage("❗ Please fill in all fields.");
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    const updatedEmployees = [...employees];
    const taskIndex = updatedEmployees[empIndex].tasks.findIndex((t) => t.id === popupOpen);

    if (taskIndex !== -1) {
      if (!updatedEmployees[empIndex].tasks[taskIndex].extensions) {
        updatedEmployees[empIndex].tasks[taskIndex].extensions = [];
      }
      updatedEmployees[empIndex].tasks[taskIndex].extensions.push({
        by: employee.name,
        requestedDate: new Date().toISOString().split("T")[0],
        days: extensionData.days,
        reason: extensionData.reason,
        status: "Pending",
      });
      saveLocalStorage("employee", updatedEmployees);
      setEmployees(updatedEmployees);
    }

    setPopupOpen(null);
    setExtensionData({ days: "", reason: "" });

    setSuccessMessage("⏳ Extension request sent!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // --- UI ---
  const categoryColors = {
    "In Progress": "from-indigo-500 to-purple-600 bg-blue-500",
    High: "from-red-600 to-pink-600 bg-red-500",
    Low: "from-emerald-500 to-green-600 bg-green-500",
  };

  return (
    <div className="relative">
      {/* Task Cards */}
      <div
        id="tasklist"
        className="flex items-center justify-start flex-nowrap gap-5 overflow-x-auto h-[400px] w-[90%] mt-24 px-10 mx-auto"
      >
        {displayTasks.map((task) => (
          <div
            key={task.id}
            className={`flex-shrink-0 h-full w-[300px] bg-gradient-to-r ${categoryColors[task.category]?.split(" ").slice(0, 2).join(" ")} rounded-xl p-5 text-white shadow-lg`}
          >
            {/* Header */}
            <div className="flex justify-between items-center text-sm">
              <h3 className={`${categoryColors[task.category]?.split(" ")[2]} px-2 py-1 rounded-sm`}>
                {task.category}
              </h3>
              <h4 className="text-sm">{task.date}</h4>
            </div>

            {/* Title + Description */}
            <h2 className="mt-5 text-xl font-semibold">{task.title}</h2>
            <p className="text-sm mt-3 text-gray-200">{task.description}</p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col gap-2">
              {/* File Upload */}
              {uploadedFiles[task.id] ? (
                <div className="flex gap-2">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-md text-sm"
                    onClick={() =>
                      setUploadedFiles((prev) => {
                        const updated = { ...prev };
                        delete updated[task.id];
                        return updated;
                      })
                    }
                  >
                    ❌ Cancel Upload
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-sm"
                    onClick={() => handleSubmitFile(task.id)}
                  >
                    ✅ Submit File
                  </button>
                </div>
              ) : (
                <label className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md cursor-pointer text-sm text-center">
                  Add File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(task.id, e)}
                  />
                </label>
              )}

              {uploadedFiles[task.id] && (
                <p className="text-xs text-gray-300 ml-2">
                  Selected: {uploadedFiles[task.id].name}
                </p>
              )}

              {/* Add Note */}
              {noteVisible[task.id] ? (
                <div className="flex flex-col gap-2 ">
                  <textarea
                    className="w-full p-2 rounded-md text-black text-sm"
                    placeholder="Write your note..."
                    value={noteInput[task.id] || ""}
                    onChange={(e) =>
                      setNoteInput((prev) => ({ ...prev, [task.id]: e.target.value }))
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-sm"
                      onClick={() => handleNoteSubmit(task.id)}
                    >
                      ✅ Submit Note
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-md text-sm"
                      onClick={() =>
                        setNoteVisible((prev) => ({ ...prev, [task.id]: false }))
                      }
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  className='bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-md text-sm'
                  onClick={() =>
                  setNoteVisible((prev) => ({ ...prev, [task.id]: true }))}
                  
                  >📝 Add Note
                </button>
              )}

            {/* Request Extension */}
            {!task.completed &&
              !task.extensions?.some(
                (ext) => ext.status === "Pending" || ext.status === "Approved"
              ) && (
                <button
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-md text-sm"
                  onClick={() => setPopupOpen(task.id)}
                >
                  ⏳ Request Extension
                </button>
              )}

            {task.extensions?.some((ext) => ext.status === "Pending") && (
              <p className="text-sm text-gray-300 ml-2">Extension: Pending</p>
            )}
            {task.extensions?.some((ext) => ext.status === "Approved") && (
              <p className="text-sm text-green-300 ml-2">Extension: Approved</p>
            )}
            {task.extensions?.some((ext) => ext.status === "Rejected") && (
              <p className="text-sm text-red-300 ml-2">Extension: Rejected</p>
            )}
          </div>
          </div>
        ))}
    </div>

      {/* Extension Popup */ }
  {
    popupOpen !== null && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-700 p-6 rounded-xl w-[400px] shadow-lg text-white">
          <h2 className="text-lg font-bold mb-4">
            Request Extension for Task {popupOpen}
          </h2>

          <label className="block text-sm font-medium mb-1">Days needed:</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-3 text-black"
            value={extensionData.days}
            onChange={(e) =>
              setExtensionData((prev) => ({ ...prev, days: e.target.value }))
            }
            min="1"
          />

          <label className="block text-sm font-medium mb-1">Reason:</label>
          <textarea
            className="w-full p-2 border rounded mb-4 text-black"
            rows="3"
            value={extensionData.reason}
            onChange={(e) =>
              setExtensionData((prev) => ({ ...prev, reason: e.target.value }))
            }
            placeholder="Briefly explain why you need an extension..."
          />

          <div className="flex justify-end gap-3">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={() => {
                setPopupOpen(null);
                setExtensionData({ days: "", reason: "" });
              }}
            >
              Cancel
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              onClick={handleExtensionSubmit}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    )
  }

  {/* Success/Error Toast */ }
  {
    successMessage && (
      <div
        className={`fixed bottom-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg ${successMessage.startsWith("✅") ? "bg-green-600" : "bg-red-600"
          }`}
      >
        {successMessage}
      </div>
    )
  }
    </div >
  );
};

export default Tasklist;
