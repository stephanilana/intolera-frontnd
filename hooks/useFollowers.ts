import { createAuthHeader } from "@/util/apiConfig";
import axios from "axios";
const config = createAuthHeader();

export async function handleGetAllFollowers() {

    const url = process.env.NEXT_PUBLIC_API_URL_HML + "follower/";
    try {
        const { data } = await axios.get(
            url,
            config
        );

        return data;
    } catch (error) {
        console.error("Erro ao buscar seguidores: ", error);
    }
}

export async function handleGetUnacceptedFollowers(id_user: string) {
    const url =
        process.env.NEXT_PUBLIC_API_URL_HML +
        "follower/" +
        id_user +
        "/user/unaccepted";
    try {
        const { data } = await axios.get(url, config);

        return data;
    } catch (error) {
        console.error("Erro ao buscar seguidores pendentes: ", error);
    }
}

export async function handleGetAcceptedFollowers(id_user: string) {
    const url =
        process.env.NEXT_PUBLIC_API_URL_HML +
        "follower/" +
        id_user +
        "/user/acepted";
    try {
        const { data } = await axios.get(url, config);

        return data;
    } catch (error) {
        console.error("Erro ao buscar seguidores aceitos: ", error);
    }
}

export async function handleAcceptFollower(id_follower: string) {
    const payload = {
        acepted: true,
    };
    const url = process.env.NEXT_PUBLIC_API_URL_HML + "follower/" + id_follower;
    try {
        const { data } = await axios.patch(url, { ...payload }, config);

        return data;
    } catch (error) {
        console.error("Erro ao aceitar seguidor: ", error);
    }
}

export async function handleUnacceptFollower(id_follower: string) {
    const url = process.env.NEXT_PUBLIC_API_URL_HML + "follower/" + id_follower;
    try {
        const { data } = await axios.delete(url, config);

        return data;
    } catch (error) {
        console.error("Erro ao recusar seguidor: ", error);
    }
}

export async function handleSendFollowRequest(id_user_follower: string, id_user_followed: string) {

    const url = process.env.NEXT_PUBLIC_API_URL_HML + "follower/";
    const payload = {
        id_user_follower: id_user_follower,
        id_user_followed: id_user_followed
    }
    try {
        const { data } = await axios.post(
            url,
            { ...payload },
            config
        );

        return data;
    } catch (error) {
        console.error("Erro ao enviar solicitação: ", error);
    }
}

export async function handleSendUnfollowRequest(id_follower: string) {

    const url = process.env.NEXT_PUBLIC_API_URL_HML + "follower/" + id_follower;
    try {
        const { data } = await axios.delete(
            url,
            config
        );

        return data;
    } catch (error) {
        console.error("Erro ao enviar solicitação de unfollow: ", error);
    }
}