"use client"; 
import FriendRequest from "@/components/FriendsRequest/FriendRequest"; 
import { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "@/contexts/AuthContext"; 
import { handleGetUnacceptedFollowers } from "@/hooks/useFollowers"; 
import Loading from "@/components/Loading"; 
 
function FriendsRequests() { 
  const [unacceptedFollowers, setUnacceptedFollowers] = useState([{}]); 
  const [loading, setLoading] = useState(true); 
  const { user } = useContext(AuthContext); 
 
 const fetchUsers = async () => { 
    try { 
      const getContent = await handleGetUnacceptedFollowers(user!._id); 
 
      setUnacceptedFollowers(getContent); 
      setLoading(false); 
    } catch (error) { 
      console.error("Error fetching unaccepted followers:", error); 
    } 
  }; 
 
  const removeFollower = (id_follower: string) => { 
    const filteredFollowers = unacceptedFollowers.filter( 
      (_: any) => _._id !== id_follower 
    ); 
    setUnacceptedFollowers(filteredFollowers); 
 
    if (Object.keys(filteredFollowers).length === 0) { 
      setLoading(false); 
    } 
  }; 
  console.log(unacceptedFollowers); 
 
  useEffect(() => { 
    fetchUsers(); 
  }, [user]); 
 
 if (loading) { 
    return <Loading />; 
  } 
 
 return (
    <> 
      <div className="container mx-auto h-screen bg-zinc-50 lg:max-w-4xl"> 
        <main className="mx-auto"> 
          <h2 className="mx-auto flex justify-center p-5 text-2xl font-bold"> 
            Solicitações de amizade 
          </h2> 
          <hr></hr> 
          <div className="mt-2 flex flex-col items-center justify-center md:px-16 lg:px-0"> 
            {unacceptedFollowers && unacceptedFollowers.length > 0 ? ( 
              unacceptedFollowers.map((item: any) => ( 
                <FriendRequest 
                  key={item.userId} 
                  removeFollower={removeFollower} 
                  props={item} 
                /> 
              )) 
            ) : ( 
              <span>Não há solicitações.</span> 
            )} 
          </div> 
        </main> 
      </div> 
    </> 
  ); 
} 
 
export default FriendsRequests; 