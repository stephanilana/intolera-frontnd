import { createAuthHeader } from '@/util/apiConfig';
import axios from "axios";

type EditUserShape = {
  id_user: string;
  name?: string | null;
  email?: string | null;
  certificate?: string | null;
};

export default async function handleEditUser(props: EditUserShape) {
  const config = createAuthHeader();
  const url = process.env.NEXT_PUBLIC_API_URL_HML + "users/" + props.id_user;
  try {
    const { data } = await axios.patch(url, { ...props }, config);

    return data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
}
