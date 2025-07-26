import { getWinChallenges } from "$lib/server/firestore";

export const load = async () => {
    let challenges = await getWinChallenges();

    return {
        challenge: challenges[challenges.length - 1] || {
            entries: []
        }
    };
}