import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UseGetUserProfile } from "@/hooks/UseGetUserProfile";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  const userId = params.id;
  UseGetUserProfile(userId);
  const { userProfile, user } = useSelector((store) => store.auth);

  const [activesTab, setActiveTab] = useState("posts");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const displayedPost = activesTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  const isLoggedinUserProfile = userProfile?._id === user.id
  const isFollowing = false;

  return (
    <div className="flex flex-col gap-4 w-full mx-auto p-6 ">
      <div className="flex gap-10 sm:gap-20 items-center  mx-auto">
        <section className="flex items-center justify-center ">
          <Avatar className="h-24 sm:h-36 w-24 sm:w-36 rounded-full overflow-hidden">
            <AvatarImage
              src={userProfile?.profilePicture}
              alt="dp"
              className="w-full h-full object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <section className="mt-5 w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center gap-2 w-full">
              <span>{userProfile?.username}</span>
              {isLoggedinUserProfile ? (
                <>
                  <Link to={'/account/edit'}>
                    <Button
                      variant="secondary"
                      className="hover:bg-slate-200 sm:text-md text-xs h-6 sm:h-8"
                    >
                      Edit profile
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    className="hover:bg-slate-200 sm:text-md text-xs h-6 sm:h-8"
                  >
                    View archive
                  </Button>
                  <Button
                    variant="secondary"
                    className="hover:bg-slate-200 sm:text-md text-xs hidden sm:block h-6 sm:h-8"
                  >
                    Add tools
                  </Button>
                </>
              ) : isFollowing ? (
                <>
                  <Button
                    variant="secondary"
                    className="rounded-full sm:text-md text-xs "
                  >
                    Unfollow
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-full sm:text-md text-xs "
                  >
                    Message
                  </Button>
                </>
              ) : (
                <Button className="bg-[#0095f6] hover:bg-[#287cb4] rounded-full sm:text-md text-xs h-6 sm:h-8">
                  Follow
                </Button>
              )}
            </div>
            <div className="flex sm:gap-4 gap-2 items-center w-full flex-wrap">
              <p className="text-xs sm:text-lg">
                <span className="font-semibold">
                  {userProfile?.posts.length}
                </span>{" "}
                posts
              </p>
              <p className="text-xs sm:text-lg">
                <span className="font-semibold">
                  {userProfile?.followers.length}
                </span>{" "}
                followers
              </p>
              <p className="text-xs sm:text-lg">
                <span className="font-semibold">
                  {userProfile?.following.length}
                </span>{" "}
                following
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full ">
              <Badge variant="secondary">
                <AtSign />
                <span className="pl-2">{userProfile?.username}</span>
              </Badge>
              <span className="text-sm text-gray-700 line-clamp-3">
                {userProfile?.bio || "bio here ...."}
              </span>
             
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-t-gray-200 mt-10">
        <div className="flex items-center justify-center gap-10 text-sm text-gray-700">
          <span
            className={`py-2 cursor-pointer ${
              activesTab === "posts" ? "font-bold" : ""
            }`}
            onClick={() => handleTabChange("posts")}
          >
            POSTS
          </span>
          <span
            className={`py-2 cursor-pointer ${
              activesTab === "saves" ? "font-bold" : ""
            }`}
            onClick={() => handleTabChange("saves")}
          >
            SAVED
          </span>
          <span className="py-2 cursor-pointer">REELS</span>
          <span className="py-2 cursor-pointer">TAGS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedPost?.map((post, index) => {
            return (
              <div key={index} className=" relative group cursor-pointer">
                <img
                  src={post.image}
                  alt="postImage"
                  className="rounded-sm py-2 w-full aspect-square object-cover"
                />
                <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4 ">
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <FaHeart/>
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <MessageCircle />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
