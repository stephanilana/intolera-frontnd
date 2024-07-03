"use client"; 
import React, { useState, useEffect, useContext } from "react"; 
import Image from "next/image"; 
import AddPostIcon from "@/public/addPostIcon.svg"; 
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { 
  faHouse, 
  faMagnifyingGlass, 
  faPhotoFilm, 
  faUser, 
  faCog, 
  faEllipsis, 
  faSpinner, 
  faHeart as fasHeart, 
} from "@fortawesome/free-solid-svg-icons"; 
import { 
  faCommentDots, 
  faSquarePlus, 
  faCompass, 
  faHeart as farHeart, 
  faBookmark, 
  faPaperPlane, 
  faFaceSmile, 
} from "@fortawesome/free-regular-svg-icons"; 
import axios from "axios"; 
import { AuthContext } from "@/contexts/AuthContext"; 
import Loading from "@/components/Loading"; 
import { createAuthHeader } from "@/util/apiConfig"; 
import Link from "next/link"; 
import { Post } from "@/components/Post/Post"; 
const config = createAuthHeader(); 
 
library.add( 
  faHouse, 
  faMagnifyingGlass, 
  faPhotoFilm, 
  faUser, 
  faCog, 
  faEllipsis, 
  faSpinner, 
  fasHeart, 
  faCommentDots, 
  faSquarePlus, 
  faCompass, 
  farHeart, 
  faBookmark, 
  faPaperPlane, 
  faFaceSmile 
); 
 
function Home() { 
  const [posts, setPosts] = useState<any>(); 
  const { user } = useContext(AuthContext); 
  const [loading, setLoading] = useState(false); 
 
  useEffect(() => { 
    setLoading(true); 
    const fetchData = async () => { 
      const url = process.env.NEXT_PUBLIC_API_URL_HML; 
      try { 
        const { data } = await axios.get( 
          `${url}publication/timeline/${user!._id}`, 
          config 
        ); 
        setPosts(data); 
      } catch (error) { 
        console.error("Erro ao buscar dados:", error); 
      } finally { 
        setLoading(false); 
      } 
    }; 
    if (user) { 
      fetchData(); 
    } 
  }, [user]); 
  if (loading) { 
    return <Loading />; 
  } 
 
  return ( 
    <div className="h-screen"> 
      <div className="container mx-auto bg-zinc-50"> 
        <main className="mx-auto  max-w-3xl"> 
          <Link 
            href={"/addPost"} 
            className="mx-auto my-2 flex max-w-[380px] items-center justify-center rounded-lg border border-gray-100 p-1 hover:bg-zinc-100" 
          > 
            <Image src={AddPostIcon} alt="AddPost" /> 
            <span 
              className={`ml-4 w-fit text-nowrap text-sm font-semibold text-black lg:py-1 lg:text-lg`} 
            > 
              Adicionar nova publicação 
            </span> 
          </Link> 
          {posts && posts.length > 0 && ( 
            <div className="md:px-12 lg:px-0"> 
              {posts.map((post: any) => ( 
                <Post key={post._id} user={user} {...post} /> 
              ))} 
            </div> 
          )} 
        </main> 
      </div> 
    </div> 
  ); 
} 
 
export default Home; 