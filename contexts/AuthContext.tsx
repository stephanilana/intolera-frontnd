import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";
import handleLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user?: User;
  setUser: (data: any) => void;
  signIn: (data: SignInData) => Promise<boolean>;
  logout: () => void;
};

type SignInData = {
  email: string;
  password: string;
};

export type User = {
  accessToken?: string;
  certificate: boolean;
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  description?: string;
  idProfile?: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const url = process.env.NEXT_PUBLIC_API_URL_HML;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      recoverUser();
    }
  }, []);

  async function recoverUser() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("loggedUserId");
      if (token && id) {
        try {
          const { data } = await axios.get(`${url}users/${token}/by-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const profileData = await axios.get(`${url}profile/${id}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser({
            accessToken: token,
            certificate: data.certificate,
            email: data.email,
            name: data.name,
            _id: id,
            profilePicture: profileData.data.profile_picture,
            description: profileData.data.description,
            idProfile: profileData.data._id,
          });
        } catch (error) {
          console.log("deu errado o recoverUser");
        }
      }
    }
  }

  async function signIn({ email, password }: SignInData) {
    try {
      console.log(email, password);
      const data = await handleLogin({ email, password });
      console.log(data, "data handle login");
      const profileData = await axios.get(
        `${url}profile/${data.user._id}/user`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      setUser({
        accessToken: data.accessToken,
        certificate: data.user.certificate,
        email: data.user.email,
        name: data.user.name,
        _id: data.user._id,
        profilePicture: profileData.data.profile_picture,
        description: profileData.data.description,
        idProfile: profileData.data._id,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("loggedUserId", data.user._id);
        localStorage.setItem("loggedUserCertificate", data.user.certificate);
      }
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
      // Adicione tratamento de erro adequado aqui, como mostrar uma mensagem de erro para o usuário
    }
  }

  async function logout() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setUser(undefined);
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
