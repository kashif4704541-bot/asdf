import React from 'react'
import EmployeeManagment from '../TaskList/EmployeeManagment';
import TaskManagment from '../TaskList/TaskManagment';
import AdminEmployeePerformance from '../TaskList/AdminEmployeePerformance';
import FooterAdmin from '../TaskList/FooterAdmin';
import { getLocalStorage, saveLocalStorage } from "../../utils/localStorage";

const getTaskCount = (employee = []) => {
  const allTasks = employee.flatMap(emp => emp.tasks || []);
  

  return {
    employee: employee.length,  // ✅ total employees
    totalTask: allTasks.length,   // ✅ all tasks
    completed: allTasks.filter(t => t.completed).length,
    extensions: allTasks.filter(t => t.pending).length, // or check `t.extensions.length > 0`
  };
};
const AdminDashboard = ({ admin ,employee=[] , handleLogout }) => {
  const count = getTaskCount(employee);
  return (
    <div>
      <div className='flex items-end justify-between bg-[#004e928c] p-10'>
        <h1 className='text-2xl font-medium'>Hello, <br />&nbsp;<span className='text-3xl font-semibold' >Admin Shaheer 👋🏼</span></h1>
        <button onClick={handleLogout} className='bg-[#ef4444] hover:bg-red-600 font-semibold text-xl shadow-md  px-5 py-2 rounded-xl transition duration-300'>Log Out</button>

      </div>
      <div className='flex justify-evenly m-20 gap-5'>
        <div className='rounded-xl w-[45%] h-40 py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{count.employee}</h2>
            <h3 className='text-xl text-white font-medium'>Total Employees</h3>
          </div>
          <img src="src/assets/users-round.svg" alt="" />
        </div>
        <div className='rounded-xl w-[45%]  py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{count.totalTask}</h2>
            <h3 className='text-xl text-white font-medium'>Total Tasks Created</h3>
          </div>
          <img src="src/assets/layout-list.svg" alt="" />
        </div>
        <div className='rounded-xl w-[45%]  py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{count.completed}</h2>
            <h3 className='text-xl text-white font-medium'>Completed Tasks</h3>
          </div>
          <img src="src/assets/file-check-2.svg" alt="" />
        </div>
        <div className='rounded-xl w-[45%]  py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{count.extensions}</h2>
            <h3 className='text-xl text-white font-medium'>Extension Requests</h3>
          </div>
          <img src="src/assets/clipboard-clock.svg" alt="" />
        </div>
      </div>

      <EmployeeManagment />
      <TaskManagment />
      <AdminEmployeePerformance />
      <FooterAdmin />

    </div>
  )
};




export default AdminDashboard