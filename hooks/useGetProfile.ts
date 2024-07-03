import { createAuthHeader } from "@/util/apiConfig";
import axios from "axios";
const config = createAuthHeader();
export async function handleGetProfileByUserId(id_user: string) {
  const url =
    process.env.NEXT_PUBLIC_API_URL_HML + "profile/" + id_user + "/user";
  try {
    const { data } = await axios.get(url, config);

    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
  }
}

export async function handleGetProfile(id_profile: string) {
  const url = process.env.NEXT_PUBLIC_API_URL_HML + "profile/" + id_profile;
  try {
    const { data } = await axios.get(url, config);

    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
  }
}

export async function handleVisitProfile(id_user: string, id_visited_user: string) {

  const url = process.env.NEXT_PUBLIC_API_URL_HML + "profile/visit?id_user=" + id_user + "&id_visited_user=" + id_visited_user;
  try {
    const { data } = await axios.get(url, config);

    return data;
  } catch (error) {
    console.error("Erro ao visitar perfil:", error);
  }
}
