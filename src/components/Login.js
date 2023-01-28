import React, { useEffect, useState } from 'react'
import { useUser } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import Ureckon from '../assets/images/ureckon.png'
import Debugger from '../assets/images/debugger.png'
function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const {setUser,user} = useUser()
    const navigate = useNavigate()
    
    useEffect(()=>{
        console.log(user);
        if(user !== null)
            navigate('/')
    },[])

    const handleSubmit =(e) => {
        e.preventDefault()
        if(username === '' || username === null || username === undefined) {
            return
        }
        if(password === '' || password === null || password === undefined) {
            return
        }
        if(username !== process.env.REACT_APP_ADMIN_USERNAME || password !== process.env.REACT_APP_ADMIN_PASSWORD) {
            alert('Invalid credentials')
            return
        }
        setUser(username)
        navigate('/')
    }
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center justify-start relative'>
        <div className='w-full h-56 bg-blue-800'></div>
        <div className='absolute top-16 flex flex-col gap-8'>
        <div className='flex gap-4 justify-center'>
            <div className='w-20 flex items-center bg-white rounded-full'>
                <img className='w-full' src={Ureckon}/>
            </div>
            <img className='w-20 bg-white rounded-full p-2' src={Debugger}/>
        </div>
        <h1 className='bg-white p-8 rounded border  text-center text-lg'><span className='text-5xl text-blue-600 font-bold uppercase tracking-wide'>Debugger Admin Panel</span></h1>
        <form className='flex flex-col gap-2 text-lg' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
                <label htmlFor='temId'>Username</label>
                <input required type={'text'} value={username} placeholder='Enter username' className='bg-gray-200 p-2' onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='temId'>Password</label>
                <input required type={'password'} value={password} placeholder='Enter password' className='bg-gray-200 p-2' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className='p-2 rounded bg-blue-600 text-white' onSubmit={handleSubmit} type='submit'>Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Login