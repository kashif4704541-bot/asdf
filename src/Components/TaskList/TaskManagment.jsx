import React from 'react'
import { useNavigate } from "react-router-dom"; // ✅ import

const TaskManagment = () => {
  const navigate = useNavigate(); // ✅ hook for navigation

  return (
    <div className=''>
      {/* Top Row */}
      <div className='flex items-center justify-between gap-5 mt-8 px-10 h-[400px] w-[90%] ml-16'>

        {/* Pending Tasks */}
        <div className='bg-gradient-to-r from-[#232526] to-[#757f9a] h-[80%] w-[300px] rounded-xl p-5 text-white shadow-lg'>
          <h2 className="text-2xl mb-4 font-semibold">Pending Tasks</h2>
          <p className="text-sm mb-6">Monitor and update all ongoing tasks, track their progress, and make adjustments as needed.</p>
          <div className="flex flex-col gap-2 mt-6">

            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black mt-12" onClick={() => navigate("/pending-tasks")}>
              👁️ View Tasks
            </button>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className='bg-gradient-to-r from-[#134e5e] to-[#71b280] h-[80%] w-[300px] rounded-xl p-5 text-white shadow-lg'>
          <h2 className="text-2xl mb-4 font-semibold">Completed Tasks</h2>
          <p className="text-sm mb-6">View all completed tasks in one place, update their status if needed, and organize them by category or priority.</p>
          <div className="flex flex-col gap-2">
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black mt-7" onClick={() => navigate("/completed-tasks")}>
              👁️ View Tasks
            </button>

          </div>
        </div>

        {/* Task Notes */}
        <div className='bg-gradient-to-r from-[#2c3e50] to-[#b08d57] h-[80%] w-[300px] rounded-xl p-5 text-white shadow-lg'>
          <h2 className="text-2xl mb-4 font-semibold">Task Notes</h2>
          <p className="text-sm mb-6">Employees can leave notes about their progress, challenges, or important details. View all task-related notes here to stay updated.</p>
          <div className="flex flex-col gap-2">
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black mt-7" onClick={() => navigate("/task-notes")}>
              👁️ View Notes
            </button>
          </div>
        </div>

        {/* Extensions */}
        <div className='bg-gradient-to-r from-[#2e003e] to-[#6a0572] h-[80%] w-[300px] rounded-xl p-5 text-white shadow-lg'>
          <h2 className="text-2xl mb-4 font-semibold">Extensions</h2>
          <p className="text-sm mb-4">Employees may request more time to complete their tasks. Review and manage all extension requests here to ensure deadlines are realistic and properly tracked.</p>
          <div className="flex flex-col gap-2">
            <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black mt-4">
              👁️ View Extensions
            </button>
          </div>
        </div>
      </div>

      {/* Create Tasks */}
      <div className="bg-gradient-to-r from-[#004e92] to-[#000428] w-[80%] h-auto ml-20 mt-8 rounded-xl p-5 shadow-lg">
        <h2 className="text-2xl mb-4 font-semibold text-white">Create Task</h2>
        <p className="text-sm mb-6 text-white">Add new tasks for employees.</p>

        <div className="flex gap-6 outline-none">
          {/* Left Column */}
          <div className="flex flex-col gap-4 w-1/2 outline-none">
            {/* Task Title */}
            <input
              type="text"
              placeholder="Task Title"
              className="p-2 rounded-lg text-gray-100 placeholder-gray-400 bg-white/10 text-2xl"
            />

            {/* Task Description */}
            <textarea
              placeholder="Task Description"
              className="p-2 rounded-lg h-40 text-gray-100 placeholder-gray-400 bg-white/10 resize-none"
            ></textarea>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 w-1/2">
            {/* Assign To */}
            <select className="p-2 rounded-lg text-gray-100 bg-white/10">
              <option className="bg-gray-800 text-gray-100">Assign To</option>
              <option className="bg-gray-800 text-gray-100">Ali</option>
              <option className="bg-gray-800 text-gray-100">Sara</option>
              <option className="bg-gray-800 text-gray-100">Ahmed</option>
            </select>

            {/* Due Date */}
            <input
              type="date"
              className="p-2 rounded-lg text-gray-100 placeholder-gray-400 bg-white/10"
            />

            {/* Priority */}
            <select className="p-2 rounded-lg text-gray-100 bg-white/10">
              <option className="bg-gray-800 text-gray-100">Priority</option>
              <option className="bg-gray-800 text-gray-100">High</option>
              <option className="bg-gray-800 text-gray-100">Medium</option>
              <option className="bg-gray-800 text-gray-100">Low</option>
            </select>
          </div>
        </div>

        {/* Centered Button */}
        <div className="flex justify-center mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 font-medium px-6 py-2 rounded-md text-sm text-white">
            Create Task
          </button>
        </div>
      </div>


    </div>
  )
}

export default TaskManagment
