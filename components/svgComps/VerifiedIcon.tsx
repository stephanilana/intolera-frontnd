import VerifiedIconImage from "@/public/images/verifiedIcon.svg"; 
import Image from "next/image"; 
function VerifiedIcon(props: any) { 
  return <Image {...props} src={VerifiedIconImage} alt="Verified Icon" />; 
} 
 
export default VerifiedIcon; 