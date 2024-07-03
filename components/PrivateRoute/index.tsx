import { APP_ROUTES } from "@/constants/app-routes"; 
import { checkUserAuthenticated } from "@/hooks/useLogin"; 
import { useRouter } from "next/navigation"; 
import { ReactNode, useEffect } from "react"; 
 
type PrivateRouteProps = { 
  children: ReactNode; 
}; 
 
export default function PrivateRoute({ children }: PrivateRouteProps) { 
  const { push } = useRouter(); 
  const isUserAuthenticated = checkUserAuthenticated(); 
  console.log(isUserAuthenticated, "isUserAuthenticated"); 
 
  useEffect(() => { 
    if (!isUserAuthenticated) { 
      push(APP_ROUTES.public.login); 
    } 
  }, [isUserAuthenticated, push]); 
  return ( 
    <> 
      {!isUserAuthenticated && null} 
      {isUserAuthenticated && children} 
    </> 
  ); 
} 