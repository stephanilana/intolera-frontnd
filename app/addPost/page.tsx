"use client"; 
/* eslint-disable react/button-has-type */ 
import React, { useState, useEffect, useContext } from "react"; 
import { useRouter } from "next/navigation"; 
import Head from "next/head"; 
import Image from "next/image"; 
import InputField from "@/components/InputField"; 
import handleSubmitPost from "@/hooks/useSubmitPost"; 
import ImageInput from "@/components/ImageInput"; 
import PhotoIcon from "@/public/photo_icon.svg"; 
import { AuthContext } from "@/contexts/AuthContext"; 
import { FetchLoggedUser } from "@/util/fetchUser"; 
import Loading from "@/components/Loading"; 
import Person from "@/public/person.svg"; 
 
function AddPost() { 
  const router = useRouter(); 
  const [loading, setLoading] = useState(false); 
  const [feedUser, setFeedUser] = useState({ 
    certificate: "", 
    description: "", 
    email: "", 
    idProfile: "", 
    name: "", 
    profilePicture: "", 
    _id: "", 
  }); 
  const { user } = useContext(AuthContext); 
 
  const profileImageSize = 70; 

  type PostShape = { 
    descricao: string; 
    image?: string; 
  }; 
  const newPost: PostShape = { descricao: "" }; 
  let [data, setData] = useState(newPost); 
 
  const updateFieldHandler = (key: string, value: string) => { 
    setData((prev) => ({ ...prev, [key]: value })); 
  }; 
 
  const [isFormValid, setIsFormValid] = useState(false); 
  useEffect(() => { 
    const isFormFilled = Boolean(data.descricao && data.image); 
    setIsFormValid(isFormFilled); 
  }, [data]); 
 
  const handleAddPost = async () => { 
    const response = await handleSubmitPost({ 
      id_user: feedUser!._id, 
      picture_publication: data.image!, 
      text: data.descricao, 
      certificated_user: feedUser!.certificate, 
    }); 
 
    if (response != null && response != undefined && response._id != null) { 
      router.push("/profilePage/" + feedUser!._id); 
    } 
  }; 
 
  useEffect(() => { 
    const runOnPageOpen = async () => { 
      setFeedUser(await FetchLoggedUser(user)); 
    }; 
 
    runOnPageOpen(); 
  }, [user]); 
 
  useEffect(() => { 
    const loadingFeedUser = Object.keys(feedUser).length === 0; 
    setLoading(loadingFeedUser); 
  }, [feedUser]); 
 
  if (loading) { 
    return <Loading />; 
  } 
 
  return ( 
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
              {feedUser.name} 
            </h1> 
          </div> 
 
          <div className="flex flex-col gap-2 px-2 pt-10 md:px-14 lg:px-32"> 
            {/* <span className="self-start">Descrição</span> */} 
            <div className="mb-8 h-32"> 
              <InputField 
                id="descricao" 
                type="text" 
                label="Descrição:" 
                value={data.descricao} 
                onChange={updateFieldHandler} 
                placeholder="Descrição" 
                fullHeight={true} 
              /> 
            </div> 
            <div className="mb-24 h-80"> 
              <div className="flex flex-row gap-5 align-middle"> 
                <div className="flex flex-col justify-center"> 
                  <label className="inline-block font-semibold"> 
                    Adicione uma imagem 
                  </label> 
                </div> 
                <Image src={PhotoIcon} alt="Photo Icon" /> 
              </div> 
              <ImageInput setFileValue={updateFieldHandler} /> 
            </div> 
            <div className="flex justify-center"> 
              <button 
                className={`flex w-fit text-nowrap rounded-[4px] px-8 py-1 text-sm font-semibold  md:px-16  
                  lg:py-1 lg:text-lg ${ 
                    !isFormValid 
                      ? "pointer-events-none bg-[#71c5fd] text-gray-50" 
                      : "bg-[#0095f6] text-black " 
                  }`} 
                onClick={() => { 
                  handleAddPost(); 
                }} 
              > 
                Postar 
              </button> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default AddPost; 
