import { createAuthHeader } from '@/util/apiConfig';
import axios from 'axios';

type GetTimelineShape = {
    id_user: string;
}
const config = createAuthHeader()
export async function handleGetTimeline(props: GetTimelineShape) {

    const url = process.env.NEXT_PUBLIC_API_URL_HML + "publication/timeline/" + props.id_user;
    try {
        const { data } = await axios.get(
            url,
            config
        );

        return data;
    } catch (error) {
        console.error("Erro ao buscar timeline:", error);
    }
}

export async function handleGetTimelineByUserId(props: GetTimelineShape) {

    const url = process.env.NEXT_PUBLIC_API_URL_HML + "publication/" + props.id_user + "/user-id";
    try {
        const { data } = await axios.get(
            url,
            config
        );

        return data;
    } catch (error) {
        console.error("Erro ao buscar timeline de usuário:", error);
    }
}