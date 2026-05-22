import type { WinChallenge } from '$lib/model/win-challenge';

export const load = async ({ parent, params }) => {
    let { challenges } = await parent();

    return {
        challenge: challenges.find(c => c.id === params.id) || {
            entries: []
        } as any as WinChallenge
    };
}