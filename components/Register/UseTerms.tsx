import { useState } from "react"; 
import RegisterTitle from "./RegisterTitle"; 
import Button from "../Button"; 
import { SwiperClass } from "swiper/react"; 
import { FormFields } from "@/app/(auth)/signUp/page"; 
import axios from "axios"; 
import { useRouter } from "next/navigation"; 
import PrivacyPolicy from "./PrivacyPolicy"; 
 
type UseTermsType = { 
  swiperRef: React.MutableRefObject<SwiperClass | null>; 
  data: FormFields; 
}; 
 
function UseTerms({ swiperRef, data }: UseTermsType) { 
  const [useTerms, setUseTerms] = useState(false); 
  const router = useRouter(); 
 
  async function handleRegister() { 
    try { 
      const url = process.env.NEXT_PUBLIC_API_URL_HML + "users/"; 
      const response = await axios.post(url, data, { 
        headers: { 
          "Content-Type": "application/json", 
        }, 
      }); 
      router.push(`/login`); 
    } catch (a) {} 
  } 
 
  return ( 
    <div className=""> 
      <RegisterTitle title="TERMOS DE USO" /> 
      <div className="border-primary/700 scroll-y-auto max-h-[500px] overflow-y-auto rounded border-2"> 
        <PrivacyPolicy /> 
      </div> 
      <div className="mt-2 flex items-center p-1"> 
        <input 
          id="default-checkbox" 
          type="checkbox" 
          checked={useTerms} 
          onClick={() => { 
            setUseTerms(!useTerms); 
          }} 
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600" 
        /> 
        <span className="ml-2 text-sm font-medium text-gray-900 hover:underline dark:text-gray-300 "> 
          Li e aceito os Temos de Uso 
        </span> 
 
        {useTerms ? ( 
          <Button type="button" label="Cadastrar" onClick={handleRegister} /> 
        ) : ( 
          <Button 
            type="button" 
            label="Voltar" 
            onClick={() => swiperRef.current?.slidePrev()} 
          /> 
        )} 
      </div> 
    </div> 
  ); 
} 
 
export default UseTerms; 