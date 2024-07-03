import { createAuthHeader } from "@/util/apiConfig";
import axios from "axios";
const config = createAuthHeader();

type SubmitPostShape = {
  id_user: string;
  picture_publication: string;
  text: string;
  certificated_user: string;
};

export default async function handleSubmitPost(props: SubmitPostShape) {
  const url = process.env.NEXT_PUBLIC_API_URL_HML + "publication/";
  try {
    const { data } = await axios.post(url, { ...props }, config);

    return data;
  } catch (error) {
    console.error("Erro ao criar publicação:", error);
  }
}
