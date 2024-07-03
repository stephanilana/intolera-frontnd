"use client"; 
/* eslint-disable react/button-has-type */ 
import React, { useState, useEffect, useContext } from "react"; 
 
import { useRouter } from "next/navigation"; 
import Image from "next/image"; 
import ProfilePost from "@/components/ProfilePost"; 
import AddPostIcon from "@/public/addPostIcon.svg"; 
import { handleGetTimelineByUserId } from "@/hooks/useGetTimeline"; 
import { AuthContext } from "@/contexts/AuthContext"; 
import { FetchLoggedUser, FetchUserFromAPI } from "@/util/fetchUser"; 
import Loading from "@/components/Loading"; 
import Person from "@/public/person.svg"; 
import { 
  handleSendFollowRequest, 
  handleSendUnfollowRequest, 
} from "@/hooks/useFollowers"; 
import { FetchLazyFollower } from "@/util/fetchFollowers"; 
import { Post } from "@/components/Post/Post"; 
 
type ProfilePageProps = { 
  params: { 
    userId: string; 
  }; 
}; 
 
function ProfilePage({ params }: ProfilePageProps) { 
  const router = useRouter(); 
  const [loadingFeedUser, setLoadingFeedUser] = useState(true); 
  const [loadingFeed, setLoadingFeed] = useState(true); 
  const [showPostId, setShowPostId] = useState(-1); 
  const [feed, setFeed] = useState<any>([{}]); 
  const [feedUser, setFeedUser] = useState<any>({}); 
  const { user } = useContext(AuthContext); 
 
  const profileImageSize = 70; 
  const [isFollowing, setIsFollowing] = useState(false); 
  const [idFollower, setIdFollower] = useState(""); 
  const [isProfileOwner, setIsProfileOwner] = useState(false); 
  const [messageFeed, setMessageFeed] = useState("Carregando publicações..."); 
  const [messageFollowButton, setMessageFollowButton] = useState("Seguir"); 
 
  const handleFollowSubmit = async () => { 
    setShowPostId(-1); 
 
    if (isFollowing) { 
      await handleSendUnfollowRequest(idFollower); 
      setMessageFollowButton("Seguir"); 
      setIsFollowing(false); 
      setFeed({}); 
    } else { 
      await handleSendFollowRequest(user!._id, feedUser!._id); 
      setMessageFollowButton("Cancelar solicitação"); 
    } 
  }; 
 
  const handleSetShowPostId = (postId: number) => { 
    setShowPostId(postId); 
    scrollToDiv(postId); 
  }; 
 
  const scrollToDiv = (postId: number) => { 
    const timer = setTimeout(() => { 
      const element = document.getElementById("post_" + postId); 
      if (element) { 
        element.scrollIntoView({ behavior: "smooth" }); 
      } 
    }, 250); 
 
    return () => clearTimeout(timer); 
  }; 
 
  useEffect(() => { 
    const runOnPageOpen = async () => { 
      const loggedUser = await FetchLoggedUser(user); 
      let targetUserId; 
 
      const hasParamUserId = 
        params.userId && 
        params.userId != undefined && 
        params.userId != "undefined"; 
      if (hasParamUserId && params.userId != loggedUser._id) { 
        targetUserId = params.userId; 
        const follower = await FetchLazyFollower(loggedUser?._id, targetUserId); 
        setIsFollowing(follower && follower.acepted ? true : false); 
        setIdFollower(follower && follower._id ? follower._id : -1); 
 
       const watchUser = await FetchUserFromAPI(targetUserId);
        setFeedUser(watchUser ?? {}); 
      } else { 
        targetUserId = loggedUser!._id; 
        setFeedUser(loggedUser ?? {}); 
        setIsProfileOwner(true); 
      } 
 
      const getFeed = await handleGetTimelineByUserId({ 
        id_user: targetUserId, 
      }); 
      if (Object.keys(getFeed).length === 0) { 
        setMessageFeed("Esta pessoa ainda não publicou nada."); 
      } 
      setFeed(getFeed); 
    }; 
 
    runOnPageOpen(); 
  }, [user]); 
 
  useEffect(() => { 
    const loadingFeedUser = Object.keys(feedUser).length === 0; 
    setLoadingFeedUser(loadingFeedUser); 
 
    const loadingFeed = Object.keys(feed).length === 0; 
    setLoadingFeed(loadingFeed); 
  }, [feedUser, feed]); 
 
 if (loadingFeedUser) {
    return <Loading />; 
  } 
 
 function ProfileContent() { 
    return ( 
      <> 
        <div id="profileContent"> 
          <div id="profileDescription" className="py-3"> 
            <div className="flex flex-col px-4 text-left font-[600] leading-[22px] md:px-10"> 
              {isFollowing || isProfileOwner ? ( 
                feedUser.description 
                  .split("\n") 
                  .map((descPart: string, index: number) => ( 
                    <p key={index}>{descPart}</p> 
                  )) 
              ) : ( 
                <p> 
                  Essa é uma conta privada, para acompanhar o conteúdo é 
                  necessário solicitar ao administrador 
                </p> 
              )} 
            </div> 
 
            <div className="px-4 py-4 md:px-10"> 
              {!isProfileOwner ? ( 
                <div className="flex justify-center"> 
                  <button 
                    className={`flex w-fit text-nowrap rounded-[4px] px-8 py-1 text-sm font-semibold text-black md:px-16 
                      ${!isFollowing ? "bg-[#0095f6]" : "bg-gray-300"} 
                        lg:py-1 lg:text-lg`} 
                    onClick={handleFollowSubmit} 
                  > 
                    {isFollowing ? "Deixar de seguir" : messageFollowButton} 
                  </button> 
                </div> 
              ) : ( 
                <div className="flex justify-start"> 
                  <Image src={AddPostIcon} alt="AddPost" /> 
                  <button 
                    className={`ml-4 w-fit text-nowrap bg-white text-sm font-semibold text-black lg:py-1 lg:text-lg`} 
                    onClick={() => router.push("/addPost")} 
                  > 
                    Adicionar nova publicação 
                  </button> 
                </div> 
              )} 
            </div> 
 
            {isFollowing || isProfileOwner ? ( 
              !loadingFeed ? ( 
                <div 
                  className={` 
                  ${ 
                    showPostId == -1 
                      ? "flex flex-row flex-wrap content-start justify-between md:gap-[2%] md:gap-y-5" 
                      : "" 
                  } `} 
                > 
                  {feed.map((post: any) => 
                    showPostId == -1 ? ( 
                      <ProfilePost 
                        key={post._id} 
                        setShowPostId={handleSetShowPostId} 
                        props={post} 
                      ></ProfilePost> 
                    ) : ( 
                      <Post 
                        key={post._id} 
                        {...post} 
                        user={user} 
                        author_name={feedUser.name ?? feedUser.user_name} 
                        author_profile_picture={feedUser.profilePicture} 
                      ></Post> 
                    ) 
                  )} 
                </div> 
              ) : ( 
                <div className="mt-20 flex justify-center"> 
                  <span>{messageFeed}</span> 
                </div> 
              ) 
            ) : ( 
              <hr></hr> 
            )} 
          </div> 
        </div> 
      </> 
    ); 
  } 
 
  return ( 
    <> 
      {!loadingFeedUser ? ( 
        <div className="relative overflow-y-scroll"> 
          <div className="flex h-full min-h-screen w-full items-center justify-center bg-[#fafafa] px-0 md:px-20"> 
            <div className="mx-auto flex min-h-screen w-full flex-col border border-t-0 border-stone-300 bg-white md:w-5/6"> 
              <div 
                id="profileHeader" 
                className="flex w-full flex-row items-center gap-3 px-4 pt-3 leading-tight md:px-10" 
              > 
                <Image 
                  src={ 
                    (feedUser && 
                      (feedUser.profilePicture === " " || 
                        feedUser.profilePicture === "blank_profile_image")) || 
                    !feedUser.profilePicture 
                      ? Person 
                      : "data:image/svg;base64," + feedUser.profilePicture 
                  } 
                  width={profileImageSize} 
                  height={profileImageSize} 
                  alt="Imagem Perfil" 
                  className="rounded-full" 
                /> 
 
                <h1 
                  className="text-wrap text-[22px] font-bold text-[#0079DA]" 
                  style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }} 
                > 
                  {feedUser.name ?? feedUser.user_name} 
                </h1> 
              </div> 
 
              <div> 
                <ProfileContent /> 
              </div> 
            </div> 
          </div> 
        </div> 
      ) : ( 
        <></> 
      )} 
    </> 
  ); 
} 
 
export default ProfilePage; 