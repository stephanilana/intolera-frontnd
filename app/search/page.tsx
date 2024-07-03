"use client"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { useRouter } from "next/navigation"; 
import { ChangeEvent, KeyboardEvent, useState } from "react"; 
 
function Search() { 
  const router = useRouter(); 
  const [searchValue, setSearchValue] = useState(""); 
 
  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => { 
    if (e.key === "Enter") { 
      router.push(`/search/${e.target.value}`); 
    } 
  }; 
 
  const handleSearchClick = () => { 
    if (searchValue) { 
      router.push(`/search/${searchValue}`); 
    } 
  }; 
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setSearchValue(e.target.value); 
  }; 
 
  return ( 
    <div className="relative mx-auto mt-4 w-11/12 lg:hidden"> 
      <FontAwesomeIcon 
        icon="magnifying-glass" 
        className="absolute left-3 top-3 cursor-pointer text-gray-300" 
        onClick={handleSearchClick} 
      /> 
      <input 
        id="search" 
        className="w-full rounded-lg bg-gray-100 p-2 pl-10 placeholder-gray-400 focus:outline-none" 
        placeholder="Pesquisar no Intolera" 
        type="text" 
        onKeyDown={handleSearchKeyPress} 
        onChange={handleInputChange} 
      /> 
    </div> 
  ); 
} 
 
export default Search; 