"use client"; 
/* eslint-disable react/button-has-type */ 
import React, { useState, useEffect, useContext } from "react"; 
import { useRouter } from "next/navigation"; 
import Image from "next/image"; 
import ImageInput from "@/components/ImageInput"; 
import handleEditProfile from "@/hooks/useEditProfile"; 
import { AuthContext, User } from "@/contexts/AuthContext"; 
import Loading from "@/components/Loading"; 
import InputField from "@/components/InputField"; 
import Person from "@/public/person.svg"; 
 
function EditProfile() { 
  const router = useRouter(); 
  const [loading, setLoading] = useState(true); 
  const { user, setUser } = useContext(AuthContext); 
 
  const profileImageSize = 150; 
 
  type EditProfileShape = { 
    descricao?: string; 
    image?: string; 
  }; 
  const editProfile: EditProfileShape = { descricao: "" }; 
  const [data, setData] = useState(editProfile); 
 
  const updateFieldHandler = (key: string, value: string) => { 
    setData((prev) => ({ ...prev, [key]: value })); 
  }; 
 
  const [isFormValid, setIsFormValid] = useState(false); 
  useEffect(() => { 
    const isFormFilled = Boolean(data.descricao || data.image); 
    setIsFormValid(isFormFilled); 
  }, [data]); 
 
  const handleSubmit = async () => { 
    try { 
      const responseProfile = await handleEditProfile({ 
        id_profile: user!._id, 
        description: data.descricao ?? null, 
        profile_picture: data.image ?? null, 
      }); 
 
      if (responseProfile) { 
        const updatedUser = { 
          ...user!, 
          profilePicture: responseProfile.profile_picture, 
          description: responseProfile.description, 
        }; 
        setUser(updatedUser); 
        router.push("/"); 
      } 
    } catch (error) { 
      console.error("Erro ao atualizar perfil:", error); 
    } 
  }; 
 
  useEffect(() => { 
    if (user) { 
      setLoading(false); 
    } 
  }, [user]); 
 
  if (loading) { 
    return <Loading />; 
  } 
 
  return ( 
    <> 
      {!loading ? ( 
        <div className="relative overflow-y-scroll"> 
          <div className="flex h-full min-h-screen w-full items-center justify-center bg-[#fafafa] px-0 md:px-20"> 
            <div className="mx-auto flex min-h-screen w-full flex-col border border-t-0 border-stone-300 bg-white md:w-5/6"> 
              <div 
                id="profileHeader" 
                className="flex w-full flex-col items-center justify-center gap-3 px-4 pt-3 leading-tight md:px-10" 
              > 
                <div className="relative inline-block"> 
                  <Image 
                    src={ 
                      (user && 
                        (user.profilePicture === " " || 
                          user.profilePicture === "blank_profile_image")) || 
                      !user!.profilePicture 
                        ? Person 
                        : "data:image/svg;base64," + user!.profilePicture 
                    } 
                    width={profileImageSize} 
                    height={profileImageSize} 
                    alt="Imagem Perfil" 
                    className="aspect-square rounded-full" 
                  /> 
                  <div className="absolute bottom-0 right-0 aspect-square h-10"> 
                    <ImageInput setFileValue={updateFieldHandler} /> 
                  </div> 
                </div> 
 
                <h1 
                  className="text-wrap text-[22px] font-bold text-[#0079DA]" 
                  style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }} 
                > 
                  {user!.name} 
                </h1> 
              </div> 
 
              <div className="flex flex-col gap-2 px-2 md:px-14 lg:px-32"> 
                <div className="mb-8"> 
                  <InputField 
                    id="descricao" 
                    type="text" 
                    label="Descrição:" 
                    value={data.descricao!} 
                    onChange={updateFieldHandler} 
                    placeholder={user!.description!} 
                  /> 
                </div> 
 
                <div className="flex justify-center"> 
                  <button 
                    className={`flex w-fit text-nowrap rounded-[4px] px-8 py-1 text-sm font-semibold  md:px-16  
                  lg:py-1 lg:text-lg ${ 
                    !isFormValid 
                      ? "pointer-events-none bg-[#71c5fd] text-gray-50" 
                      : "bg-[#0095f6] text-black " 
                  }`} 
                    onClick={handleSubmit} 
                  > 
                    Atualizar 
                  </button> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      ) : ( 
        "" 
      )} 
    </> 
  ); 
} 
 
export default EditProfile; 
 