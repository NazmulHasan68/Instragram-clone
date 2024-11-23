import { setPosts } from "@/redux/postSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const UseGetAllPost = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllPost = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/post/all`, {withCredentials:true})
                if(res.data.success){ 
                    dispatch(setPosts(res.data.post))
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAllPost()
    },[])
}