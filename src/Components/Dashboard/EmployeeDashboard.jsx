import React from 'react'
import Tasklist from '../TaskList/Tasklist'
import EmployeePerformance from '../TaskList/EmployeePerformance'
import Footer from '../TaskList/Footer'

// ✅ Helper function to calculate counts
const getTaskCount = (tasks = []) => ({
  active: tasks.filter(t => t.active).length,
  newTask: tasks.filter(t => t.newTask).length,
  completed: tasks.filter(t => t.completed).length,
  pending: tasks.filter(t => t.pending).length,
})


const EmployeeDashboard = ({ employee, handleLogout }) => {
  const counts = getTaskCount(employee?.tasks)

  return (
    <div>
      <div className='flex items-end justify-between bg-[#004e928c] p-10'>
        <h1 className='text-2xl font-medium'>Hello, <br />&nbsp;<span className='text-3xl font-semibold' >{employee.name} 👋🏼</span></h1>
        <button onClick={handleLogout} className='bg-[#ef4444] hover:bg-red-600 font-semibold text-xl shadow-md  px-5 py-2 rounded-xl transition duration-300'>Log Out</button>
      </div>
      <div className='flex justify-evenly m-20 gap-5'>
        <div className='rounded-xl w-[45%] h-40 py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{counts.newTask}</h2>
            <h3 className='text-xl text-white font-medium'>New Tasks</h3>
          </div>
          <img src="src/assets/file-plus-2.svg" alt="" />
        </div>
        <div className='rounded-xl w-[45%]  py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{counts.completed}</h2>
            <h3 className='text-xl text-white font-medium'>Completed Tasks</h3>
          </div>
          <img src="src/assets/file-check-2.svg" alt="" />
        </div>
        <div className='rounded-xl w-[45%]  py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{counts.active}</h2>
            <h3 className='text-xl text-white font-medium'>In Progress Task</h3>
          </div>
          <img src="src/assets/loader.svg" alt="" />
        </div>
        <div className='rounded-xl w-[45%]  py-6 px-8 bg-transparent border-2 border-gray-600 flex justify-between'>
          <div>
            <h2 className='text-3xl text-white font-semibold'>{counts.pending}</h2>
            <h3 className='text-xl text-white font-medium'>Pending Task</h3>
          </div>
          <img src="src/assets/clipboard-clock.svg" alt="" />
        </div>
      </div>
      <Tasklist employeeId={employee?.id} />
      <EmployeePerformance employee={employee} />
      <Footer />

    </div>
  )
}

export default EmployeeDashboard
