import type { FirebaseApp } from "firebase/app";
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '$env/static/private'

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
} as FirebaseOptions;

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
    if (!app) {
        app = initializeApp(firebaseConfig);
    }
    return app;
}