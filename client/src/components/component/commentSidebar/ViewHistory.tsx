import { useEffect } from "react"


const ViewHistory = ({questionId}: {questionId: string}) => {

    useEffect(()=>{
        if(questionId)
            fetchHistory(questionId)
    }, [questionId])
  return (
    <div>
        
    </div>
  )
}

export default ViewHistory


const fetchHistory = async (questionId: string) => {
    const raw = await fetch(`${import.meta.env.VITE_SERVER_URI}/section/${questionId}/history`, {
        credentials: 'include',
        headers: {
            'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
        }
    });
    const res = await raw.json();
    console.log(res);
}