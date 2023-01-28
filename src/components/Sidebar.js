import axios from '../axios/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useExam } from '../context/examContext'
import { useUser } from '../context/userContext'
import Debugger from '../assets/images/debugger.png'
import Ureckon from '../assets/images/ureckon.png'

function Sidebar() {
    const {rounds,setRounds} = useExam()
    const {user,setUser} = useUser()
    const [showAddRound,setShowAddRound] = useState(false)
    const [adding,setAdding] = useState(false)

    const getRoutes = async () => {
        try{
            const res = await axios.get('/round/all')
            setRounds(res.data.rounds)
            // console.log(res.data);
        }
        catch(err){
            // console.log(err);
        }
    }

    useEffect(() => {
        // console.log(rounds)
        getRoutes()
    },[])

    const navigate = useNavigate()

    useEffect(() => {
        if(user === null) navigate('/login')
    },[user])


    const handleAddRound = async (e) => {
        e.preventDefault()
        setAdding(true)
        // console.log(e.target[0].value);
        try{
            const res = await axios.post('/round/add',{name:e.target[0].value})
            // console.log(res.data);
            setRounds([...rounds,res.data.round])
        }
        catch(err){
            // console.log(err);
        }
        setAdding(false)
        setShowAddRound(false)
    }

  return (
    user && <div>
        <div className='flex flex-col justify-between h-full py-4 text-white bg-blue-800 w-36'>
            <div>
            <div className='flex gap-4 px-4 pb-4'>
                <div className='w-12 flex items-center bg-white rounded-full'>
                    <img className='w-full' src={Ureckon}/>
                </div>
                <img className='w-12 bg-white rounded-full p-2' src={Debugger}/>
                </div>
                <h2 className='px-4 py-2 border-y'>Rounds</h2>
                <div className='flex flex-col gap-4 p-2'>
                    <div className='flex flex-col gap-2'>
                        {rounds?.map((round,index) => (
                            <Link to={`/round/${round?.name}/${round?._id}`} key={round?._id} className='px-4 hover:bg-blue-900'>{round?.name}</Link>
                            ))}
                    </div>
                    <button title='Add New Round' onClick={()=>setShowAddRound(true)} className='p-2 rounded bg-blue-600'>Add Round</button>
                    {showAddRound && <form onSubmit={handleAddRound} className='flex flex-col gap-2'>
                        <input required type="text" placeholder='Round Name' className='text-black p-2 rounded'/>
                        <button onSubmit={handleAddRound} type='submit'>Add</button>
                    </form>}
                </div>
            </div>
            <div className='flex flex-col p-2 gap-2 border-t'>
                <h2 className=''>{user}</h2>
                <button title='Logout' onClick={()=>setUser(null)} className='p-2 rounded bg-blue-600'>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar