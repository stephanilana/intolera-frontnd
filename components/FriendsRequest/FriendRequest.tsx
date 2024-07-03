import VerifiedIcon from "@/components/svgComps/VerifiedIcon"; 
import Image from "next/image"; 
import Button from "@/components/Button"; 
import Person from "@/public/person.svg"; 
import { handleAcceptFollower } from "@/hooks/useFollowers"; 
import { useRouter } from "next/navigation"; 
import Link from "next/link"; 
function FriendRequest({ removeFollower, props }: any) { 
  const router = useRouter(); 
 
  async function handleSubmit(accepted: boolean) { 
    if (accepted) { 
      await handleAcceptFollower(props._id); 
    } else { 
      await handleAcceptFollower(props._id); 
    } 
 
    removeFollower(props._id); 
  } 
 
  return ( 
    <> 
      <div className="mx-auto mb-2 flex max-w-96 rounded-3xl bg-gray-100 p-2"> 
        <Image 
          className="inline w-24 max-w-none cursor-pointer rounded-full" 
          src={ 
            props.profile_picture !== "blank_profile_image" 
              ? "data:image/svg;base64," + props.profile_picture ?? "" 
              : Person 
          } 
          alt="User Image" 
          width={250} 
          height={250} 
          onClick={() => router.push(`/profilePage/${props.userId}`)} 
        /> 
        <div className="ml-4 "> 
          <div> 
            <Link 
              href={`/profilePage/${props.userId}`} 
              className="ml-2 text-lg font-medium" 
            > 
              {props.name} 
            </Link> 
            <VerifiedIcon className="ml-1 inline w-4 max-w-none rounded-full" /> 
          </div> 
          <div className="flex gap-3 "> 
            <Button 
              label="Adicionar" 
              onClick={() => { 
                handleSubmit(true); 
              }} 
            /> 
            <Button 
              label="Remover" 
              variant="outline" 
              onClick={() => { 
                handleSubmit(false); 
              }} 
            /> 
          </div> 
        </div> 
      </div> 
    </> 
  ); 
} 
 
export default FriendRequest; 