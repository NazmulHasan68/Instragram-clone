import { useSelector } from "react-redux";
import Post from "./Post";

export default function Posts() {
  const {posts} = useSelector(state=>state.post)
  return (
    <div className="w-full">
      {posts && posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
  
}
