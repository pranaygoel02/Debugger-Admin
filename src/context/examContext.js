import React,{useContext,useState,useEffect} from 'react'
import axios from '../axios/axiosInstance'

const ExamContext = React.createContext()

export const useExam = () => {
    return useContext(ExamContext)
}


export const ExamProvider = ({children}) => {
   const [rounds,setRounds] = useState([])
    
   useEffect(() => {

    },[]) 

    const value = {
        rounds,setRounds
    }

    return (
        <ExamContext.Provider value={value}>
            {children}
        </ExamContext.Provider>
    )

}
