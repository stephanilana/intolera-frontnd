"use client"; 
import React, { useState, useEffect } from "react"; 
import Image from "next/image"; 
import Link from "next/link"; 
import axios from "axios"; 
import Person from "@/public/person.svg"; 
import Cow from "@/public/cow.svg"; 
import VerifiedIcon from "@/components/svgComps/VerifiedIcon"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { 
  faSpinner, 
  faHeart as fasHeart, 
} from "@fortawesome/free-solid-svg-icons"; 
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons"; 
import { createAuthHeader } from "@/util/apiConfig"; 
 
const config = createAuthHeader(); 
 
const MAX_COMMENTS = 3; 
 
export function Post(props: any) { 
  const { 
    _id, 
    id_user, 
    picture_publication, 
    text, 
    created_at, 
    author_name, 
    author_profile_picture, 
    certified_publication, 
    user, 
  } = props; 
  const error = console.error; 
  console.error = (...args) => { 
    if (/defaultProps/.test(args[0])) return; 
    error(...args); 
  }; 
  const [isBookmarked, setIsBookmarked] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isPostModalOpen, setPostModalOpen] = useState(false); 
  const [showAllComments, setShowAllComments] = useState(false); 
  const [comment, setComment] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [isLiked, setIsLiked] = useState(false); 
  const [comments, setComments] = useState<any>([]); 
  const url = process.env.NEXT_PUBLIC_API_URL_HML; 
  const commentsToShow = showAllComments 
    ? comments 
    : comments.slice(0, MAX_COMMENTS); 
 
  useEffect(() => { 
    const fetchComments = async () => { 
      try { 
        const url = process.env.NEXT_PUBLIC_API_URL_HML; 
        const { data } = await axios.get( 
          `${url}comment/${_id}/publication`, 
          config 
        ); 
        console.log(data); 
        setComments(data); 
      } catch (error) { 
        console.error("Error fetching comments:", error); 
      } 
    }; 
 
    fetchComments(); 
  }, [_id]); 
 
  const likePost = async (id: string) => { 
    console.log("Liked post with ID:", id); 
    setIsLiked(true); 
  }; 
 
  const createComment = async () => { 
    if (!comment) { 
      return; 
    } 
    try { 
      const { data } = await axios.post( 
        `${url}comment/`, 
        { 
          id_user: user._id, 
          id_publication: _id, 
          text: comment, 
        }, 
        config 
      ); 
      setComments((prevComments: any) => [...prevComments, data]); 
    } catch (e) { 
      console.log(e); 
    } finally { 
      setComment(""); 
    } 
  }; 
 
  const formattedDate = new Date(created_at); 
  const day = formattedDate.getDate().toString().padStart(2, "0"); 
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); 
  const year = formattedDate.getFullYear(); 
  const hours = formattedDate.getHours().toString().padStart(2, "0"); 
  const minutes = formattedDate.getMinutes().toString().padStart(2, "0"); 
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`; 
 
  const unlikePost = async (id: string) => { 
    console.log("Unliked post with ID:", id); 
    setIsLiked(false); 
  }; 
 
  return ( 
    <div id={`post_${_id}`} className="mb-5 rounded-lg border border-slate-200"> 
      <div className="flex flex-row p-3"> 
        <div className="w-[80%] flex-1"> 
          <Link href={`/profilePage/${id_user}`} className=""> 
            <Image 
              className="inline w-8 max-w-none rounded-full" 
              src={ 
                author_profile_picture.profilePicture === " " || 
                author_profile_picture === "blank_profile_image" || 
                !author_profile_picture  
                  ? Person 
                  : "data:image/svg;base64," + author_profile_picture 
              } 
              alt="User Image" 
              width={100} 
              height={100} 
            />{" "} 
            <span className="ml-2 text-sm font-medium">{author_name}</span> 
            <VerifiedIcon className="ml-1 inline w-4 max-w-none rounded-full" /> 
          </Link> 
        </div> 
      </div> 
      <Image 
        className="mx-auto aspect-square w-full lg:w-[75%] 2xl:w-[65%]" 
        alt={`Photo by ${author_name}`} 
        src={"data:image/svg;base64," + picture_publication} 
        width={100} 
        height={100} 
      /> 
 
      <div className="header flex flex-row items-center px-3 py-2"> 
        <button 
          className={`mr-3 cursor-pointer`} 
          onClick={() => (isLiked ? unlikePost(_id) : likePost(_id))} 
        > 
          <Image 
            src={Cow} 
            alt="Curtir" 
            className={`aspect-square w-8 ${ 
              !isLiked ? "emptyOutlinedBorder" : "" 
            } `} 
          /> 
        </button> 
      </div> 
      <div className="px-3 text-sm"> 
        <span className="font-semibold"> 
          {author_name} 
          {certified_publication && ( 
            <VerifiedIcon className="ml-1 inline w-4 max-w-none rounded-full" /> 
          )} 
        </span>{" "} 
        {text} 
      </div> 
      <div className="px-3 pt-2 text-sm"> 
        {commentsToShow.map((comment: any) => ( 
          <div key={comment._id}> 
            <Link 
              href={`/profilePage/${comment.id_user}`} 
              className="font-bold" 
            > 
              {comment.name} 
              {comment.valid_certification && ( 
                <VerifiedIcon className="ml-1 inline w-4 max-w-none rounded-full" /> 
              )} 
            </Link>{" "} 
            {comment.text} 
          </div> 
        ))} 
 
        {comments.length > MAX_COMMENTS && !showAllComments && ( 
          <button 
            className="block cursor-pointer px-3 py-2 text-sm text-gray-500" 
            onClick={() => setShowAllComments(true)} 
          > 
            View all {comments.length} comments 
          </button> 
        )} 
      </div> 
 
      <div className="px-3 pb-5 pt-2 text-[0.65rem] tracking-wide text-gray-500"> 
        Postado em: {formattedDateTime} 
      </div> 
 
      <div className="relative flex flex-row border-t px-3 py-2"> 
        <div 
          className={`absolute left-0 top-0 h-full w-full pt-3 text-center ${ 
            loading ? "block" : "hidden" 
          }`} 
        > 
          <FontAwesomeIcon 
            className={`fa-spin text-2xl text-gray-400`} 
            icon={["fas", "spinner"]} 
          /> 
        </div> 
        <div className="flex items-center"> 
          <span className="cursor-pointer text-2xl"> 
            <FontAwesomeIcon icon={["far", "face-smile"]} /> 
          </span> 
        </div> 
        <div className="flex-1 py-1 pr-3"> 
          <input 
            className={`w-full bg-slate-50 px-3 py-1 text-sm outline-0`} 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            type="text" 
            placeholder="Add a comment..." 
            disabled={loading} 
          /> 
        </div> 
        <div className="flex items-center text-sm"> 
          <button 
            className={`font-medium ${ 
              comment ? "cursor-pointer text-sky-500" : "text-sky-200" 
            }`} 
            onClick={() => createComment()} 
          > 
            Post 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
} 