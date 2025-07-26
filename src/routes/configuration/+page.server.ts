export const load = async () => {
    return {
        entries: [
            { title: 'Brotato', description: '1 Win auf Danger 5', times: [{ time: new Date(2025, 6, 24, 0, 0, 0), type: 'start'}] },
            { title: 'Fortnite', description: '1 Win in Null Bauen', times: [
                { time: new Date(2025, 6, 23, 1, 0, 0), type: 'start'},
                { time: new Date(2025, 6, 23, 1, 20, 0), type: 'end'}
            ] },
            { title: 'League of Legends', description: '1 Win im Ranked', times: [] },
            { title: 'Marvel Rivals', description: '1 Win in einer normalen Runde', times: [] }
        ]
    };
}