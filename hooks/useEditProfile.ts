import { createAuthHeader } from "@/util/apiConfig";
import axios from "axios";

type EditProfileShape = {
  id_profile: string;
  description?: string | null;
  profile_picture?: string | null;
};

export default async function handleEditProfile(props: EditProfileShape) {
  const config = createAuthHeader();
  console.log("props", props);
  const url =
    process.env.NEXT_PUBLIC_API_URL_HML + "profile/" + props.id_profile;
  try {
    const { data } = await axios.patch(url, { ...props }, config);

    return data;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
  }
}
