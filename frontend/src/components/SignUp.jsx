
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function SignUp() {
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const [input , setInput] = useState({
    username: "",
    email : "",
    password: ""
  })
  const [loading ,setloading] = useState(false)

  const changeEventHandeler =(e)=>{
    setInput({...input, [e.target.name]:e.target.value})
  }

  const singupHandler = async(e)=>{
    e.preventDefault()
    console.log(input);
    try {
      setloading(true)
      const res = await axios.post(`http://localhost:8000/api/v1/user/register`,input ,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
        setInput({
          username: "",
          email : "",
          password: ""
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }finally{
      setloading(false)
    }
  }
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form onSubmit={singupHandler} className="shadow-lg flex flex-col sm:flex-row gap-4 max-w-7xl">
        <div className="flex justify-center items-center flex-col flex-1 bg-slate-100 px-6 sm:py-12 py-24">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-center text-slate-500 py-2">Sign up to see photos and videos from your friends</p>
        </div>
        <div className="flex flex-col gap-5 py-4 px-4 flex-1">
          <div>
            <Label className='font-medium'>Username</Label>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandeler}
              className='focus-visible:ring-transparent my-2 text-slate-600 text-sm'
            />
          </div>
          <div>
            <Label className='font-medium'>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandeler}
              className='focus-visible:ring-transparent my-2 text-slate-600 text-sm'
            />
          </div>
          <div>
            <Label className='font-medium'>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandeler}
              className='focus-visible:ring-transparent my-2 text-slate-600 text-sm'
            />
          </div>
          <Button type="submit">{loading?<><Loader2/>Please wait</>:'Sign up'}</Button>
          <p>Already have account <Link to={'/login'} className="text-teal-600"> Login now</Link></p>
        </div>
      </form>
    </div>
  )
}
