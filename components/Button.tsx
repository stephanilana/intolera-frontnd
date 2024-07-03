import React from "react"; 
 
interface SwiperButtonProps { 
  onClick?: () => void; 
  label: string; 
  className?: string; 
  type?: "button" | "submit"; 
  disabled?: boolean; 
  variant?: "primary" | "outline"; 
} 
 
const Button: React.FC<SwiperButtonProps> = ({ 
  onClick, 
  label, 
  className = "", 
  type = "button", 
  disabled = false, 
  variant = "primary", 
}) => { 
  const baseStyles = 
    "my-5 w-full rounded-[4px] px-2 py-1 text-sm font-semibold"; 
  const primaryStyles = 
    "bg-primary/600 hover:bg-primary/700 text-white disabled:bg-blue-300"; 
  const outlineStyles = 
    "border border-primary/600 text-primary/600 hover:bg-gray/100"; 
 
  const styles = `${baseStyles} ${ 
    variant === "outline" ? outlineStyles : primaryStyles 
  } ${className}`; 
 
  return ( 
    <button 
      onClick={onClick} 
      className={`${className} ${styles}`} 
      type={type} 
      disabled={disabled} 
    > 
      {label} 
    </button> 
  ); 
}; 
 
Button.defaultProps = { 
  className: "", 
  type: "button", 
  disabled: false, 
  variant: "primary", 
}; 
 
export default Button; 