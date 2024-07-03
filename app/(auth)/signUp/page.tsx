"use client"; 
/* eslint-disable react/button-has-type */ 
import React, { FormEvent, useRef, useState } from "react"; 
 
import { useRouter } from "next/navigation"; 
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"; 
import ProfileType from "../../../components/Register/ProfileType"; 
 
import "swiper/css"; 
import User from "../../../components/Register/User"; 
 
import Button from "../../../components/Button"; 
import UseTerms from "../../../components/Register/UseTerms"; 
import PDFCertificate from "../../../components/Register/PDFCertificate"; 
 
export type FormFields = { 
  userType: string; 
  username: string; 
  email: string; 
  password: string; 
  phone: string; 
  certificate: string; 
}; 
 
const formTemplate: FormFields = { 
  userType: "", 
  username: "", 
  email: "", 
  password: "", 
  phone: "", 
  certificate: "", 
}; 
 
function SignUp() { 
  const router = useRouter(); 
  const [loading, setLoading] = useState(false); 
  const swiperRef = useRef<SwiperClass | null>(null); 
  const [data, setData] = useState(formTemplate); 
 
  const updateFieldHandler = (key: string, value: string) => { 
    setData((prev) => ({ ...prev, [key]: value })); 
  }; 
  
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    swiperRef.current?.slideNext(); 
  }; 
 
  if (loading) { 
    return ( 
      <div className="flex h-[100vh] w-full items-center justify-center dark:bg-[#131313]"> 
        <picture> 
          <img src="/instagramLoading.png" alt="loading" /> 
        </picture> 
      </div> 
    ); 
  } 
 
  return ( 
    <div> 
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa] "> 
        <div> 
          <div className="flex max-w-[350px] flex-col items-center justify-center border border-stone-300 bg-white"> 
            <div className="w-full px-10"> 
              <form 
                action="" 
                className="signInPageFormContainer" 
                onSubmit={handleFormSubmit} 
              > 
                <Swiper 
                  slidesPerView={1} 
                  onSwiper={(swiper) => { 
                    swiperRef.current = swiper; 
                  }} 
                  allowTouchMove={false} 
                  loop={false} 
                  spaceBetween={40} 
                > 
                  <SwiperSlide key={0} className="px-0.5"> 
                    <ProfileType 
                      data={data} 
                      updateFieldHandler={updateFieldHandler} 
                    /> 
                    <Button type="submit" label="Próximo" disabled={false} /> 
                  </SwiperSlide> 
 
                  <SwiperSlide key={1} className="px-0.5"> 
                    <User 
                      swiperRef={swiperRef} 
                      data={data} 
                      updateFieldHandler={updateFieldHandler} 
                    /> 
                  </SwiperSlide> 
 
                  {data.userType === "certificated" && ( 
                    <SwiperSlide key={2}> 
                      <PDFCertificate 
                        swiperRef={swiperRef} 
                        data={data} 
                        updateFieldHandler={updateFieldHandler} 
                      /> 
                    </SwiperSlide> 
                  )} 
 
                  <SwiperSlide key={3} className="px-0.5"> 
                    <UseTerms swiperRef={swiperRef} data={data} /> 
                  </SwiperSlide> 
                </Swiper> 
              </form> 
            </div> 
          </div> 
          <div className="mt-2 flex max-w-[350px] flex-col justify-center border border-stone-300 bg-white py-5 text-center text-[14px]"> 
            <p>Já possui uma conta?</p> 
            <button 
              className="ml-1 font-semibold text-[#0095f6]" 
              type="button" 
              onClick={() => router.push("/login")} 
            > 
              Logar 
            </button> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default SignUp;