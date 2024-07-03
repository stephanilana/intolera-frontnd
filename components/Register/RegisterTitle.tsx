type RegisterTitleType = { 
  title: string; 
}; 
function RegisterTitle({ title }: RegisterTitleType) { 
  return ( 
    <div className="my-8 text-center text-xl font-bold text-primary/700 "> 
      <h1 style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>{title}</h1> 
    </div> 
  ); 
} 
 
export default RegisterTitle; 