"use client"; 
import "./globals.css"; 
import "@fontsource/poppins"; 
import { usePathname } from "next/navigation"; 
import { checkIsPublicRoute } from "@/util/checkIsPublicRoute"; 
import PrivateRoute from "@/components/PrivateRoute"; 
import Navbar from "@/components/NavBar";  
import { AuthProvider } from "@/contexts/AuthContext"; 
import { useEffect, useState } from "react"; 
 
export default function RootLayout({ 
  children, 
}: Readonly<{ 
  children: React.ReactNode; 
}>) { 
  return ( 
    <html lang="en"> 
      <body> 
        <AuthProvider> 
          <AppContent>{children}</AppContent> 
        </AuthProvider> 
      </body> 
    </html> 
  ); 
} 
 
function AppContent({ children }: { children: React.ReactNode }) { 
  const pathname = usePathname(); 
  const isPublicPage = checkIsPublicRoute(pathname); 
 
  const [isMounted, setIsMounted] = useState(false); 
 
  useEffect(() => { 
    setIsMounted(true); 
  }, []); 
 
  if (!isMounted) { 
    return null; 
  } 
 
  return ( 
    <> 
      <Navbar /> 
      {isPublicPage ? children : <PrivateRoute>{children}</PrivateRoute>} 
    </> 
  ); 
} 