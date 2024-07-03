import Image from "next/image"; 
import { useEffect, useState } from "react"; 
import LogoLogin from "../../public/intoleraLogin.svg"; 
 
type ProfileProps = { 
  data: { 
    userType: string; 
  }; 
  updateFieldHandler: (key: string, value: string) => void; 
}; 
 
function ProfileType({ data, updateFieldHandler }: ProfileProps) { 
  const [selectedCheckbox, setSelectedCheckbox] = useState( 
    data.userType || "intolerant" 
  ); 
 
  const handleCheckboxChange = (checkbox: string) => { 
    setSelectedCheckbox(checkbox); 
    updateFieldHandler("userType", checkbox); 
  }; 
 
  useEffect(() => { 
    updateFieldHandler("userType", selectedCheckbox); 
  }, []); 
 
  return ( 
    <div className="flex max-w-[350px] flex-col items-center justify-center"> 
      <div className="h-auto w-[230px] py-8"> 
        <Image src={LogoLogin} alt="Logo Intolera" /> 
      </div> 
      <div className="text-primary/700 px-10 pb-5 text-center font-semibold "> 
        <p style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>Você é:</p> 
      </div> 
      <div className="w-full px-4"> 
        <div className="mb-20"> 
          <div> 
            <div 
              className="mb-4 flex items-center" 
              onClick={() => handleCheckboxChange("intolerant")} 
            > 
              <input 
                id="default-checkbox" 
                type="checkbox" 
                checked={selectedCheckbox === "intolerant"} 
                onChange={() => handleCheckboxChange("intolerant")} 
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600" 
              /> 
              <span className="ml-2 text-sm font-medium text-gray-900 hover:underline dark:text-gray-300 "> 
                Intolerante à lactose 
              </span> 
            </div> 
            <div 
              className="flex items-center " 
              onClick={() => handleCheckboxChange("certificated")} 
            > 
              <input 
                id="checked-checkbox" 
                type="checkbox" 
                checked={selectedCheckbox === "certificated"} 
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600" 
              /> 
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> 
                Profissional da área da saúde 
              </span> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default ProfileType; 