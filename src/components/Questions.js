import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useExam } from '../context/examContext'
import axios from '../axios/axiosInstance'
import QuestionCard from './QuestionCard'
import Footer from './Footer'

function Questions() {
    const {name,id} = useParams()
    const navigate = useNavigate()
    const {rounds,setRounds} = useExam()
    const [showDelete,setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [addQues,setAddQues]  = useState(false)
    
    const [questions,setQuestions] = useState(null)
    const [downloadQues,setDownloadQues] = useState([])
    const [downloadQuesData,setDownloadQuesData] = useState([])

    const downloadData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions));


    const [title,setTitle] = useState('')
    const [code,setCode] = useState('')
    const [options,setOptions] = useState('')
    const [answer,setAnswer] = useState('')
    
    

    const getQuestions = async () => {
        try{
            const res = await axios.get(`/question/${id}`)
            // // console.log(res.data);
            if(res.data.success){
                setQuestions(res.data.questions)
            }
        }
        catch(err){
            // // console.log(err);
        }
    }
    
    useEffect(() => {
        getQuestions()
    },[id])


    const handleDeleteRound = async () => {
        // // console.log('delete round');
        try{
            const res = await axios.post(`/round/delete`,{id})
            // // console.log(res.data.success);
            if( res.data.success) {
                setRounds(rounds.filter(round => round._id !== id))
                setShowDelete(false)
                navigate('/')
            }
        }
        catch(err){
            // // console.log(err);
        }
    }
    
    const handleEditRound = async (e) => {
        e.preventDefault()
        // console.log('edit round');
        try{
            const res = await axios.post(`/round/edit`,{id,name: e.target[0].value})
            // console.log(res.data);
            // console.log(res.data.success);
            if( res.data.success) {
                setRounds(prev => prev.map(round => round._id === id ? {...round,name: e.target[0].value} : round))
                setShowEdit(false)
                navigate(`/round/${e.target[0].value}/${id}`)
            }
        }
        catch(err){
            // console.log(err);
        }
    }

    const addDownloadQuestion = (question) => {
        setDownloadQues(prev => [...prev,question])
    }

    const removeDownloadQuestion = (question) => {
        setDownloadQues(prev => prev.filter(item => item._id !== question._id))
    }

    useEffect(()=>{
        setDownloadQuesData("text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(downloadQues)));
    },[downloadQues])

    const addQuestionHandler = async (e) => {
        e.preventDefault()
        // console.log('add question');
        // console.log({round: id,title,code,options: options.split(','),answer: answer === '' ? options.split(',')[0] : answer});
        try{
            const res = await axios.post(`/question/add`,{round: id,title,code,options: options.split(';').map(item => item.trim()),answer: answer === '' ? options.split(';')[0].trim() : answer})
            // console.log(res.data);
            if( res.data.success) {
                setQuestions(prev => [...prev,res.data.newQuestion])
                setAddQues(false)
                setAnswer('')
                setCode('')
                setOptions('')
                setTitle('')
            }
        }
        catch(err){
            // console.log(err);
        }
    }


    return (
    <div className='p-4 w-full h-full flex flex-col items-start gap-4 overflow-auto justify-between'>
        <div className='w-full flex flex-col items-start gap-4'>     
        <div className='w-full flex items-center justify-between'>
        <h1 className='font-bold text-xl'>{name} Questions</h1>
        <div className='flex gap-4 relative'>
        <a href={'data:' + downloadData} download={`${name}.json`} title='Download' className='p-2 border border-blue-600 text-black rounded hover:bg-blue-600 hover:text-white transition-all'>Download All Questions</a>
        <a href={'data:' + downloadQuesData} download={`${name}.json`} title='Download' className='p-2 border border-blue-600 text-black rounded hover:bg-blue-600 hover:text-white transition-all'>Download Selected Questions</a>
        <button onClick={()=>{
            setShowEdit(!showEdit)
            setShowDelete(false)
        }} title='Edit Round' className='p-2 bg-blue-600 text-white rounded'>Edit Round</button>
        <button onClick={()=>{
            setShowDelete(!showDelete)
            setShowEdit(false)
        }} title='Delete Round' className='p-2 bg-red-600 text-white rounded'>Delete Round</button>
        {showEdit && 
        <form onSubmit={handleEditRound} className='absolute top-12 gap-2 flex flex-col p-4 right-0 bg-white border rounded shadow-md z-10'>
            <input placeholder='Enter new name of round' required type="text" className='p-2 border rounded' />
            <button type='submit' onSubmit={handleEditRound} className='p-2 bg-blue-600 text-white rounded'>Update Name</button>
        </form>}
        {showDelete && 
        <div className='absolute top-12 gap-2 flex flex-col p-4 right-0 bg-white border rounded shadow-md z-10'>
            <p>Are you sure you want to delete this round?</p>
            <button onClick={handleDeleteRound} className='p-2 bg-red-600 text-white rounded'>Delete Round</button>
        </div>}
        </div>
        </div>
        <button onClick={()=>setAddQues(!addQues)} title='Add Question' className='p-2 bg-blue-600 text-white rounded'>Add Question</button>
        {addQues &&
            <form onSubmit={addQuestionHandler} className='text-black flex flex-col p-4 rounded-lg gap-4 w-full border shadow-md'> 
                <div className='flex flex-col gap-1'>
                    <label htmlFor='title'>Question Title</label>
                    <input className='p-2 bg-gray-200' value={title} onChange={(e)=>setTitle(e.target.value)} name='title' type="text" placeholder='Enter question title' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='code'>Code (Enter Markdown)</label>
                    <textarea required className='p-2 bg-gray-200' value={code} onChange={(e)=>setCode(e.target.value)} rows={5} name='code' placeholder='Enter question code in markdown' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='options'>Options (Comma Spearated)</label>
                    <input required className='p-2 bg-gray-200' onChange={(e)=>setOptions(e.target.value)} value={options} name='options' type="text" placeholder='Enter question options here. Ex: Option 1,Option 2,Option 3,Option 4' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='answer'>Correct Option</label>
                    <select required defaultValue={options.split(',')[0]} onChange={(e)=>setAnswer(e.target.value)} className='p-2 bg-gray-200' name="answer" id="answer">
                        {options.split(';').map((option,index) => <option key={index} value={option}>{option}</option>)}
                    </select>
                </div>
                <button onSubmit={addQuestionHandler} type='submit' className='p-2 bg-blue-600 text-white rounded'>Add Question</button>
            </form>
        }
        {questions?.length > 0 ? questions.map((question,index) => <QuestionCard addDownloadQuestion={addDownloadQuestion} removeDownloadQuestion={removeDownloadQuestion} setQuestions={setQuestions} index={index} question={question} />) : <p>No Questions Found</p>}
        </div>
        <Footer/>
    </div>
  )
}

export default Questions