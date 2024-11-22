import { useSelector } from "react-redux";
import Post from "./Post";

export default function Posts() {
  const {posts} = useSelector(state=>state.post)
  return (
    <div className="w-full ">
        {
            posts?.map((post, index)=><Post key={index} post={post}/>)
        } 
    </div>
  )
}
