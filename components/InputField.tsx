import React from "react"; 
 
interface InputFieldProps { 
  id: string; 
  type: "text" | "email" | "password" | "tel"; 
  label: string; 
  value: string; 
  onChange: (key: string, value: string) => void; 
  placeholder: string; 
  error?: string; 
  fullHeight?: boolean; 
} 
 
const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  type, 
  label, 
  value, 
  onChange, 
  placeholder, 
  error = "", 
  fullHeight = false, 
}) => ( 
  <div className={`${fullHeight ? "h-full" : ""}`}> 
    <label htmlFor={id} className="font-semibold"> 
      {label} 
    </label> 
    <input 
      className={`hover:border-primary/700 focus:outline-primary/700 w-full rounded-md border border-stone-300 bg-[#fafafa] 
        px-2 py-[7px] text-sm font-normal shadow-md ${fullHeight ? "h-full" : ""}`} 
      type={type} 
      id={id} 
      value={value} 
      onChange={(e) => onChange(id, e.target.value)} 
      placeholder={placeholder} 
    /> 
    {error && <p className="h-[20px] text-[10px] text-red-600">{error}</p>} 
  </div> 
); 
 
export default InputField; 