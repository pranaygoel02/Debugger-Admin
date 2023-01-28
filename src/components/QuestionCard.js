import React, { useEffect, useState } from 'react'
import showdown from 'showdown'
import axios from '../axios/axiosInstance'

function QuestionCard({question,index, setQuestions}) {

    const [showDelete,setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const [title,setTitle] = useState(question?.title)
    const [code,setCode] = useState(question?.code)
    const [options,setOptions] = useState(question?.options?.join(','))
    const [answer,setAnswer] = useState(question?.answer)



    const convertToCode = () => {
        const converter = new showdown.Converter()
        const html = converter.makeHtml(question?.code)
        document.getElementById(`code${index}`).innerHTML = html
      }

      useEffect(() => {  
        console.log('useEffect convertToCode');
        convertToCode()
        },[])

    const editQuestionHandler = async (e) => {
        e.preventDefault()
        console.log('options: ',options.split(','));
        try{
            const res = await axios.post(`/question/edit`,{id: question._id, title, code, options: options.split(','), answer})
            console.log(res.data.updatedQuestion);
            if( res.data.success) {
                setShowEdit(false)
                setQuestions(prev => prev.map(ques => ques._id === question._id ? {...ques, ...res.data.updatedQuestion} : ques))
                window.location.reload()
            }
        }
        catch(err){
            console.log(err);
        }
    }
    

    const handleDeleteQuestion = async () => {
        console.log('delete question');
        try{
            const res = await axios.post(`/question/delete`,{id: question._id})
            console.log(res.data.success);
            if( res.data.success) {
                setShowDelete(false)
                setQuestions(prev => prev.filter(ques => ques._id !== question._id))
            }
        }
        catch(err){
            console.log(err);
        }
    }



  return (
    <>
    <div className='text-black flex flex-col p-4 rounded-lg gap-2 w-full border bg-white shadow-sm'> 
        <div className='flex justify-between relative'>
            <h2 className='font-bold'>{index + 1}. {question?.title}</h2>
            <div className='absolute top-0 right-0 flex gap-2'>
            <button onClick={()=>{
            setShowEdit(!showEdit)
            setShowDelete(false)
        }} title='Edit Question' className='px-2 bg-blue-600 rounded text-white'>Edit</button>
            <button onClick={()=>{
            setShowDelete(!showDelete)
            setShowEdit(false)
        }}  title='Delete Question' className='p-2 bg-red-600 rounded text-white'>Delete</button>
        {showDelete && 
        <div className='absolute w-max top-12 gap-2 flex flex-col p-4 right-0 bg-white border rounded shadow-md z-10'>
            <p>Are you sure you want to delete this question?</p>
            <button onClick={handleDeleteQuestion} className='p-2 bg-red-600 text-white rounded'>Delete Question</button>
        </div>}

        
            </div>
        </div>
        <div className='flex flex-col gap-1'>
            <label>Code</label>
            <p id={`code${index}`}></p>
        </div>
        <div className='flex flex-col gap-1'>
            <label>Options</label>
            <select className='border p-2' name="options" id="options">
                {question?.options?.map((option,index) => (
                    <option value={option} key={index}>{option}</option>
                    ))}
            </select>
        </div>
        <p>Answer: {question?.answer}</p>
    </div>
    {showEdit &&
        <form onSubmit={editQuestionHandler} className='text-black flex flex-col p-4 gap-4 border shadow-xl absolute w-[600px] h-full top-0 right-0  z-10 bg-white'> 
            <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-xl'>Update Question</h2>
            <button className='border p-2 rounded-full' onClick={()=>setShowEdit(!showEdit)}>X</button>
            </div>
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
                <select required defaultValue={answer} onChange={(e)=>setAnswer(e.target.value)} className='p-2 bg-gray-200' name="answer" id="answer">
                    {options &&  options.split(',').map((option,index) => <option key={index} value={option}>{option}</option>)}
                </select>
            </div>
            <button onSubmit={editQuestionHandler} type='submit' className='p-2 bg-blue-600 text-white rounded'>Update Question</button>
        </form>
    }
    </>
  )
}

export default QuestionCard