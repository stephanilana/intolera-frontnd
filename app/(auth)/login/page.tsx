"use client"; 
import React, { useContext, useEffect, useState } from "react"; 
import { useRouter } from "next/navigation"; 
import Image from "next/image"; 
import LogoLogin from "@/public/intoleraLogin.svg"; 
import useSetFormErrors from "@/hooks/useSetFormErrors"; 
import { AuthContext } from "@/contexts/AuthContext"; 
 
export default function Login() { 
  const router = useRouter(); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [emailFormErrors, setEmailFormErrors] = useState(""); 
  const [passwordFormErrors, setPasswordFormErrors] = useState(""); 
  const [, setUsernameFormErrors] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro 
  const [isLoading, setIsLoading] = useState(false); // Estado para o botão de carregamento 
  const { signIn } = useContext(AuthContext); 
 
  useSetFormErrors({ 
    email, 
    password, 
    setEmailFormErrors, 
    setPasswordFormErrors, 
    setUsernameFormErrors, 
  }); 
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    console.log("login", email, password); 
    localStorage.clear(); 
    setIsLoading(true); 
 
    try { 
      let responseStatus = await signIn({ 
        email: email, 
        password: password, 
      }); 
      if (!responseStatus) { 
        setErrorMessage("Usuário ou senha inválidos"); 
      } 
      router.push("/"); 
    } catch (error) { 
      console.log("Erro ao fazer login: " + error); 
    } finally { 
      setIsLoading(false); 
    } 
  }; 
 
  useEffect(() => { 
    const runOnPageOpen = () => { 
      localStorage.clear(); 
    }; 
 
    runOnPageOpen(); 
  }, []); 
 
  return ( 
    <div> 
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-gray-100"> 
        <div> 
          <div className="flex max-w-[350px] flex-col items-center justify-center border border-stone-300 bg-white"> 
            <div className="h-auto w-[230px] py-8"> 
              <Image src={LogoLogin} alt="Logo Intolera" /> 
            </div> 
            <div className="w-full px-5 sm:px-10"> 
              <form className="signInPageFormContainer" onSubmit={handleSubmit}> 
                <label htmlFor="signInPageEmail" className="font-medium"> 
                  Email: 
                  <input 
                    className="hover:border-primary/700 focus:outline-primary/700 w-full rounded-md border border-stone-300 bg-[#fafafa]  px-2 py-[7px] text-sm font-normal shadow-md" 
                    type="email" 
                    id="signInPageEmail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email address" 
                  /> 
                </label> 
                <p className="h-[20px] max-w-[220px] pb-2 text-[10px] text-red-600"> 
                  {emailFormErrors} 
                </p> 
                <label htmlFor="signInPagePassword" className="font-medium"> 
                  Senha: 
                  <input 
                    className="hover:border-primary/700 focus:outline-primary/700 w-full rounded-md border border-stone-300 bg-[#fafafa]  px-2 py-[7px] text-sm font-normal shadow-md" 
                    type="password" 
                    id="signInPagePassword" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                  /> 
                </label> 
                <p className=" max-w-[220px] text-[10px] text-red-600"> 
                  {passwordFormErrors} 
                </p> 
                <button 
                  className={`${ 
                    emailFormErrors === "" && passwordFormErrors === "" 
                      ? "bg-[#0095f6]" 
                      : "pointer-events-none cursor-default bg-[#abddff]" 
                  } my-5 w-full rounded-[4px]  px-2 py-1 text-sm font-semibold text-white`} 
                  type="submit" 
                  disabled={isLoading} // Desabilita o botão quando está carregando 
                > 
                  {isLoading ? "Carregando..." : "Logar"} 
                </button> 
                {errorMessage && ( 
                  <p className="flex justify-center text-sm text-red-600"> 
                    {errorMessage} 
                  </p> 
                )} 
              </form> 
            </div> 
          </div> 
          <div className="mt-2 flex max-w-[350px] flex-col border border-stone-300 bg-white py-5 text-center text-[14px]"> 
            <p>Ainda não possui uma conta?</p> 
            <button 
              className="ml-1 font-semibold text-[#0095f6]" 
              type="button" 
              onClick={() => router.push("/signUp")} 
            > 
              Cadastre-se 
            </button> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 