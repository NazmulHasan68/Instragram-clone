import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SuggestedUsers() {
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="py-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-semibold cursor-pointer">see ALl</span>
      </div>
      <div>
        {suggestedUsers?.map((user, index) => {
          return (
            <div key={index} className="mt-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Link to={`/profile/${user?._id}`}>
                    <Avatar>
                      <AvatarImage
                        src={user?.profilePicture}
                        alt="post_image"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col gap-0">
                    <h1 className="font-semibold">
                      <Link to={`/profile/${user?._id}`} className="text-sm">{user?.username}</Link>
                    </h1>
                    <span className="text-gray-600 text-xs line-clamp-1 w-[100%]">
                      {user?.bio || "bio here..."}
                    </span>
                  </div>
                </div>
                <div>
                    <h1 className="text-[#3BADF8] text-sm cursor-pointer hover:text-[#3495d6]">Follow</h1>
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
}
