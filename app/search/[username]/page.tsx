"use client"; 
import SearchedUser from "@/components/Search/SearchedUser"; 
import { createAuthHeader } from '@/util/apiConfig'; 
import axios from "axios"; 
import { useEffect, useState } from "react"; 
 
type SearchUserProps = { 
  params: { 
    username: string; 
  }; 
}; 
 
export type UserFromAPI = { 
  _id: string; 
  name: string; 
  profile_picture: string; 
  certificate: string; 
}; 
 
function SearchUser({ params }: SearchUserProps) { 
  const [users, setUsers] = useState<UserFromAPI[]>([] as UserFromAPI[]); 
  const config = createAuthHeader() 
  useEffect(() => { 
    const fetchUsers = async () => { 
      try { 
        const url = process.env.NEXT_PUBLIC_API_URL_HML; 
        const { data } = await axios.get( 
          `${url}users/${params.username}/by-name`, 
          config 
        ); 
        console.log(data); 
        setUsers(data); 
      } catch (error) { 
        console.error("Error fetching comments:", error); 
      } 
    }; 
 
    fetchUsers(); 
  }, [params.username]); 
 
  return ( 
    <> 
      <div className="container mx-auto h-screen bg-zinc-50 lg:max-w-4xl"> 
        <main className="mx-auto"> 
          <h2 className="mx-auto flex justify-center p-5 text-lg font-semibold"> 
            Retorno da busca: 
            <span className={"ml-2 font-normal"}> 
              &quot;{params.username}&quot; 
            </span> 
          </h2> 
          <hr></hr> 
          <div className="mt-2 md:px-16 lg:px-0"> 
            {users.map((user) => ( 
              <SearchedUser key={user._id} searchedUser={user} /> 
            ))} 
          </div> 
        </main> 
      </div> 
    </> 
  ); 
} 
 
export default SearchUser; 