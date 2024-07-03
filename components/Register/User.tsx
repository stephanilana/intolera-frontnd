import React, { useState, useEffect } from "react"; 
import RegisterTitle from "./RegisterTitle"; 
import InputField from "../InputField"; 
import Button from "../Button"; 
import { SwiperClass } from "swiper/react"; 
 
type UserProps = { 
  swiperRef: React.MutableRefObject<SwiperClass | null>; 
  data: { 
    username: string; 
    email: string; 
    password: string; 
    phone: string; 
  }; 
  updateFieldHandler: (key: string, value: string) => void; 
}; 
 
function User({ swiperRef, data, updateFieldHandler }: UserProps) { 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const [isFormValid, setIsFormValid] = useState(false); 
 
  useEffect(() => { 
    const isFormFilled = Boolean( 
      data.username && 
        data.email && 
        data.password && 
        data.phone && 
        confirmPassword 
    ); 
    const isPasswordMatch = data.password === confirmPassword; 
 
    setPasswordError(isPasswordMatch ? "" : "As senhas não coincidem."); 
    setIsFormValid(isFormFilled && isPasswordMatch); 
  }, [data, confirmPassword]); 
 
  return ( 
    <> 
      <div className=""> 
        <RegisterTitle title="CADASTRO" /> 
        <div className="flex flex-col gap-4"> 
          <InputField 
            id="username" 
            type="text" 
            label="Nome de Usuário:" 
            value={data.username || ""} 
            onChange={updateFieldHandler} 
            placeholder="Digite o username" 
          /> 
          <InputField 
            id="phone" 
            type="tel" 
            label="Telefone:" 
            value={data.phone || ""} 
            onChange={updateFieldHandler} 
            placeholder="+5546999999999" 
          /> 
          <InputField 
            id="email" 
            type="email" 
            label="Email:" 
            value={data.email} 
            onChange={updateFieldHandler} 
            placeholder="Email address" 
          /> 
          <InputField 
            id="password" 
            type="password" 
            label="Senha:" 
            value={data.password} 
            onChange={updateFieldHandler} 
            placeholder="Password" 
          /> 
          <div> 
            <label className="font-semibold">Confirmar Senha:</label> 
            <input 
              className="hover:border-primary/700 focus:outline-primary/700 w-full rounded-md border border-stone-300 bg-[#fafafa]  px-2 py-[7px] text-sm font-normal shadow-md " 
              type="password" 
              id="signInPageConfirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm Password" 
            /> 
          </div> 
          {passwordError && <p className="text-red-500">{passwordError}</p>} 
        </div> 
      </div> 
      <div className="mt-10 flex space-x-4"> 
        <Button 
          onClick={() => swiperRef.current?.slidePrev()} 
          label="Anterior" 
          disabled={isFormValid} 
        /> 
        <Button type="submit" label="Próximo" disabled={!isFormValid} /> 
      </div> 
    </> 
  ); 
} 
 
export default User; 