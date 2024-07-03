import VerifiedIcon from "@/components/svgComps/VerifiedIcon"; 
import Image from "next/image"; 
import Button from "@/components/Button"; 
import { UserFromAPI } from "@/app/search/[username]/page"; 
import { useContext, useState } from "react"; 
import axios from "axios"; 
import { AuthContext } from "@/contexts/AuthContext"; 
import Person from "@/public/person.svg"; 
import { createAuthHeader } from "@/util/apiConfig"; 
import { useRouter } from "next/navigation"; 
import Link from "next/link"; 
 
type SearchedUserType = { 
  searchedUser: UserFromAPI; 
}; 
 
function SearchedUser({ searchedUser }: SearchedUserType) { 
  const router = useRouter(); 
  const url = process.env.NEXT_PUBLIC_API_URL_HML; 
  const [isInvited, setIsInvited] = useState(false); 
  const { user } = useContext(AuthContext); 
  const config = createAuthHeader(); 
 
  async function handleInviteIn() { 
    try { 
      const { data } = await axios.post( 
        `${url}follower/`, 
        { 
          id_user_follower: user!._id, 
          id_user_followed: searchedUser._id, 
        }, 
        config 
      ); 
      if (data) { 
        console.log("deu certo"); 
        setIsInvited(true); 
      } 
    } catch (e) { 
      console.log(e); 
    } 
  } 
 
  async function handleCancelInvite() { 
    try { 
      const { data } = await axios.delete( 
        `${url}follower/${searchedUser._id}`, 
        config 
      ); 
      if (data) { 
        setIsInvited(false); 
      } 
    } catch (e) { 
      console.log(e); 
    } 
  } 
 
  return ( 
    <> 
      <div className="mx-auto mb-2 flex max-w-96 justify-center rounded-3xl bg-gray-100 py-2"> 
        <Image 
          className="inline w-24 max-w-none cursor-pointer rounded-full" 
          src={ 
            (searchedUser && 
              (searchedUser.profile_picture === " " || 
                searchedUser.profile_picture === "blank_profile_image")) || 
            !searchedUser.profile_picture 
              ? Person 
              : "data:image/svg;base64," + searchedUser.profile_picture 
          } 
          width={200} 
          height={200} 
          alt="User Image" 
          onClick={() => router.push(`/profilePage/${searchedUser._id}`)} 
        /> 
        <div className="ml-4 "> 
          <div> 
            <Link 
              href={`/profilePage/${searchedUser._id}`} 
              className="ml-2 text-lg font-medium" 
            > 
              {searchedUser.name} 
            </Link> 
            <VerifiedIcon className="ml-1 inline w-4 max-w-none rounded-full" /> 
          </div> 
          <div className="flex gap-3 "> 
            {!isInvited ? ( 
              <Button 
                type="button" 
                label={"Adicionar aos amigos"} 
                onClick={() => handleInviteIn()} 
              /> 
            ) : ( 
              <Button 
                type="button" 
                variant={"outline"} 
                label={"Cancelar"} 
                onClick={() => handleCancelInvite()} 
              /> 
            )} 
          </div> 
        </div> 
      </div> 
    </> 
  ); 
} 
 
export default SearchedUser; 