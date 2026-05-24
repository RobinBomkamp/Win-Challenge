import { getWinChallenges } from "$lib/server/firestore";

export const load = async () => {
    let challenges = await getWinChallenges();

    return {
        challenges
    };
}