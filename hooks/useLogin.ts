import axios from "axios";

type LoginShape = {
  email: string;
  password: string;
};

export default async function handleLogin({ email, password }: LoginShape) {
  const url = process.env.NEXT_PUBLIC_API_URL_HML + "auth/login";
  try {
    const { data } = await axios.post(
      url,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    console.error("Erro ao buscar dados:", error);
  }
}

export function checkUserAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return !!token;
  }
  return false;
}
