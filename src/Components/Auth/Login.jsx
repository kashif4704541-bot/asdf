import React, { useState } from 'react'

const Login = ({handleLogin}) => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler= (e)=>{
    e.preventDefault() 
    handleLogin(email, password)

    setEmail("")
    setPassword("")
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='border-2 rounded-xl border-red-900 p-20'>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }} className='flex flex-col items-center justify-center'>
          <input 
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }} type="email" placeholder='Email' required className='py-4 px-5 h-10 w-80 border-2 border-red-400 bg-transparent  rounded-3xl font-poppins text-base text-white placeholder-white outline-none'/>
          <input
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          type="password" placeholder='Password' required className='mt-4 mb-4 px-5 py-4 h-10 w-80 border-2 border-red-400 bg-transparent rounded-3xl font-poppins text-base text-white placeholder-white outline-none'/>
          <button type="submit" className='h-10 w-40 mt-5 text-2xl font-semibold font-serif bg-red-500 rounded-2xl border-none'>Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login