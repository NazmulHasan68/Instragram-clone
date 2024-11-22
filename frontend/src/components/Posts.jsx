import Post from "./Post";

export default function Posts() {
  return (
    <div className="w-full">
        {
            [1, 2, 3, 4].map((item, index)=><Post key={index}/>)
        } 
    </div>
  )
}
