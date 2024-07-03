import { handleGetUser } from "../hooks/useGetUser";
import { handleGetProfileByUserId } from "../hooks/useGetProfile";

export const FetchLoggedUser = async (user: any) => {

    const tryFromContext = await FetchUserFromContext(user);
    if (tryFromContext) {
        return tryFromContext;
    }

    const getLoggedUserId = localStorage.getItem("loggedUserId");
    if (!getLoggedUserId) { return null; }

    return {};
}

async function FetchUserFromContext(user: any) {

    let targetUserId;

    targetUserId = `${user && user._id}`;
    if (targetUserId) {
        return user;
    }

    return null;
}

export const FetchUserFromAPI = async (targetUserId: string) => {
    const userResponse = await handleGetUser(targetUserId);
    const profileResponse = await handleGetProfileByUserId(targetUserId);

    if (userResponse != null && profileResponse != null) {
        const fetchedUser = {
            _id: userResponse._id,
            name: userResponse.name,
            email: userResponse.email,
            certificate: userResponse.certificate,
            idProfile: profileResponse._id ?? "",
            description: profileResponse.description,
            profilePicture: profileResponse.profile_picture ?? "",
        }

        return fetchedUser;
    }

    return null;
};