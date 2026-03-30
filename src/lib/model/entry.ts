export class EntryModel {
    title: string = '';
    description?: string = '';
    times: EntryTimeModel[] = [];
    estimtaedTime?: number = -1;
    completed?: boolean = false;
    requiredRounds?: number = 1;
    completedRounds?: number = 0;
}

export class EntryTimeModel {
    time: Date = new Date();
    type: 'start' | 'end' = 'start';
}