import { handleGetUser } from "../hooks/useGetUser";
import { handleGetProfileByUserId } from "../hooks/useGetProfile";
import { handleGetAllFollowers } from "@/hooks/useFollowers";

export const FetchLazyFollower = async (
  id_user_follower: string,
  id_user_followed: string
) => {
  const getAllFollowers = await handleGetAllFollowers();
  const tryFromContent = getAllFollowers.find(
    (_: any) =>
      _.id_user_follower == id_user_follower &&
      _.id_user_followed == id_user_followed
  );

  return tryFromContent ?? null;
};
