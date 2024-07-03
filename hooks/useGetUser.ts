import { createAuthHeader } from '@/util/apiConfig';
import axios from "axios";
const config = createAuthHeader();

export async function handleGetUser(id_user: string) {
    const url = process.env.NEXT_PUBLIC_API_URL_HML + "users/" + id_user;
    try {
        const { data } = await axios.get(url, config);

        return data;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
    }
}
