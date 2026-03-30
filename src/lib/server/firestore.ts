import { collection, getDocs, getFirestore, setDoc, doc } from "firebase/firestore";
import { getFirebaseApp } from "./firebase";
import type { WinChallenge } from "$lib/model/win-challenge";
import { addDoc } from "firebase/firestore/lite";

export async function getWinChallenges(): Promise<WinChallenge[]> {
    const app = getFirebaseApp();
    const firestore = getFirestore(app);
    const challengesCollection = collection(firestore, 'win-challenge');

    const querySnapshot = await getDocs(challengesCollection);
    const challenges = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WinChallenge));
    

    challenges.forEach(challenge => {
        if (!challenge.entries) {
            challenge.entries = [];
        }

        challenge.entries.forEach(entry => {
            const parsedRequiredRounds = Number(entry.requiredRounds ?? 1);
            const safeRequiredRounds = Number.isFinite(parsedRequiredRounds) ? Math.max(1, Math.floor(parsedRequiredRounds)) : 1;

            const defaultCompletedRounds = entry.completed ? safeRequiredRounds : 0;
            const parsedCompletedRounds = Number(entry.completedRounds ?? defaultCompletedRounds);
            const safeCompletedRounds = Number.isFinite(parsedCompletedRounds)
                ? Math.min(safeRequiredRounds, Math.max(0, Math.floor(parsedCompletedRounds)))
                : defaultCompletedRounds;

            entry.requiredRounds = safeRequiredRounds;
            entry.completedRounds = safeCompletedRounds;

            if (entry.completed === undefined) {
                entry.completed = safeCompletedRounds >= safeRequiredRounds;
            }

            if (entry.completed) {
                entry.completedRounds = safeRequiredRounds;
            }

            if (entry.independentStart === undefined) {
                entry.independentStart = false;
            }
        });
    });

    return challenges;
}

export async function setWinChallenge(challenge: WinChallenge): Promise<string> {
    const app = getFirebaseApp();
    const firestore = getFirestore(app);
    const challengesCollection = collection(firestore, 'win-challenge');

    if (!challenge.id) {
        const docRef = await addDoc(challengesCollection, challenge);
        challenge.id = docRef.id;
    } else {
        await setDoc(doc(firestore, "win-challenge", challenge.id), challenge);
    }

    return challenge.id;
}