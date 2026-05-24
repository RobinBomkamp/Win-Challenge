import { setWinChallenge, deleteWinChallenge } from "$lib/server/firestore";
import { json } from "@sveltejs/kit";

export async function POST({request}) {
    const challenge = await request.json();
    
    return json({
        id: await setWinChallenge(challenge),
    }, { status: 200 });
}

export async function DELETE({params}) {
    await deleteWinChallenge(params.id);
    return json({ success: true }, { status: 200 });
}