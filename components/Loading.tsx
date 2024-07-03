import Vaca from "@/public/cow.svg"; 
function Loading() { 
  return ( 
    <div className="flex h-[100vh] w-full flex-col items-center justify-center dark:bg-[#131313]"> 
      <picture> 
        <img src={Vaca.src} alt="loading" /> 
      </picture> 
      <p>Carregando...</p> 
    </div> 
  ); 
} 
 
export default Loading; 