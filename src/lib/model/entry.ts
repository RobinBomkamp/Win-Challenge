export class EntryModel {
    title: string = '';
    description?: string = '';
    times: EntryTimeModel[] = [];
    estimtaedTime?: number = -1;
    completed?: boolean = false;
}

export class EntryTimeModel {
    time: Date = new Date();
    type: 'start' | 'end' = 'start';
}