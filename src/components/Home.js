import React,{useEffect, useState} from 'react'
import { useUser } from '../context/userContext'
import { useExam } from '../context/examContext'
import { useNavigate } from 'react-router-dom'

function Home() {
    const {user,setUser} = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        // // console.log('user: ', user);
        if(user === null){
            navigate('/login')
        }
    },[])
    
    return (
        user && 
        <div className='flex flex-row w-full h-full relative'>
            Dashboard
            
        </div>
    )
}

export default Home