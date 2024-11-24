
import { setMessages } from "@/redux/chatSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const UseGetAllMessage = () =>{
    const {selectedUser} = useSelector(store =>store.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchAllmessage = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser?._id}`, {withCredentials:true})
                
                if(res.data.success){ 
                    dispatch(setMessages(res.data.messages))
                    console.log(res);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAllmessage()
    },[])
}